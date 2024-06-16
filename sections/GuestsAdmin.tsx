import { eq } from "drizzle-orm";
import { SectionProps } from "deco/types.ts";
import type { AppContext } from "site/apps/deco/records.ts";
import { guests } from "site/db/schema.ts";
import { useSection } from "deco/hooks/useSection.ts";
import Icon from "site/components/ui/Icon.tsx";

type GuestInsert = typeof guests.$inferInsert;
type GuestsKeys = keyof GuestInsert;
type GuestValue<K extends keyof GuestInsert> = GuestInsert[K];

/**
 * Checa se `key` é uma chave válida do tipo guest.
 */
const isGuestPropKey = (
  key: string,
): key is GuestsKeys => key in guests.$inferInsert;

/**
 * Checa se `value` é do mesmo tipo de guests[key]
 */
const isGuestPropType = (
  key: GuestsKeys,
  value: unknown,
): value is GuestValue<typeof key> =>
  typeof value === typeof guests.$inferInsert[key];

interface Props {
  mode?: "create" | "delete";
  email?: string;
}

export async function loader(
  { mode, email }: Props,
  req: Request,
  { invoke }: AppContext,
) {
  // Client do ORM drizzle
  const drizzle = await invoke.records.loaders.drizzle();

  // Se o mode for create e o request possuir body, então cria um guest novo
  if (mode === "create" && req.body) {
    const newGuest: Partial<typeof guests.$inferInsert> = {};
    const formData = await req.formData();
    formData.forEach((value, key) =>
      isGuestPropKey(key) &&
      isGuestPropType(key, value) &&
      (newGuest[key] = value as any)
    );

    // Insere newGuest no banco de dados.
    await drizzle.insert(guests).values(
      newGuest as typeof guests.$inferInsert,
    );
  } // Se mode for delete e email for definido e não vazio, então remova todos or perfis com este email.
  else if (mode === "delete" && email) {
    await drizzle.delete(guests).where(eq(guests.email, email));
  }

  // Seleciona todos os perfils do banco de dados, trazendo somenente email e nome.
  const guestsData = await drizzle.select({
    email: guests.email,
    name: guests.name,
    confirmed: guests.confirmed,
    confirmationDate: guests.confirmationDate,
    plusOne: guests.plusOne,
    plusOneName: guests.plusOneName,
  }).from(guests);
  return { guests: guestsData };
}

export default function ManageGuests(
  { guests = [] }: SectionProps<typeof loader>,
) {
  // Url da section, com a propriedade mode = create, será utilizada para submit do form e criação de novo perfil.
  const createUrl = useSection<Props>({
    props: { mode: "create" },
  });
  return (
    <>
      <div>
        <form
          hx-post={createUrl}
          hx-trigger="click"
          hx-target="closest section"
          hx-swap="outerHTML"
          class="p-2 flex flex-col gap-2"
        >
          <div class="flex gap-2">
            <label for="name">Name</label>
            <input
              // propriedade name do guests
              name="name"
              id="name"
              required
              class="border border-gray-300 rounded"
            />
          </div>

          <div class="flex gap-2">
            <label for="description">email</label>
            <input
              // propriedade email do guests
              name="email"
              id="email"
              required
              class="border border-gray-300 rounded"
            />
          </div>

          <div>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>

      <div class="divide-y divide-gray-300 p-2 w-fit">
        <h3>Members List</h3>
        {guests.map((guest) => {
          // Url da section, com a propriedade mode = delete e email do perfil a ser removido, será utilizada para submit do form e remoção  do perfil.
          const guestDeleteUrl = useSection<Props>({
            props: { mode: "delete", email: guest.email ?? "" },
          });
          return (
            <div class="flex gap-2 items-center">
              <span>{guest.name}</span>
              <span>{guest.email}</span>
              <span>{guest.confirmed ? "Confirmed" : "Not Confirmed"}</span>
              <span>{guest.confirmationDate}</span>
              <span>{guest.plusOne ? "Has Plus One" : "No Plus One"}</span>
              <span>{guest.plusOneName}</span>
              <form
                hx-post={guestDeleteUrl}
                hx-trigger="click"
                hx-target="closest section"
                hx-swap="outerHTML"
                class="w-4 h-4"
              >
                <button type="submit" class="w-4 h-4">
                  <Icon id="Trash" size={16} />
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </>
  );
}
