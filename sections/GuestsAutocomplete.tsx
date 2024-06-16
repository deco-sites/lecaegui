import { like } from "drizzle-orm";
import { SectionProps } from "deco/types.ts";
import type { AppContext } from "site/apps/deco/records.ts";
import { guests } from "site/db/schema.ts";
import { useSection } from "deco/hooks/useSection.ts";

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
  mode?: "search" | "confirm";
  email?: string;
}

export async function loader(
  { mode = "search" }: Props,
  req: Request,
  { invoke }: AppContext,
) {

  console.log("loader", req)

  const drizzle = await invoke.records.loaders.drizzle();

  let guestsData: Partial<typeof guests.$inferInsert>[] = []; 
  
  if (req.method === 'POST' && req.headers.get('content-type')?.includes('multipart/form-data')) {
    const newGuest: Partial<typeof guests.$inferInsert> = {};
    const formData = await req.formData();
    formData.forEach((value, key) =>
      isGuestPropKey(key) &&
      isGuestPropType(key, value) &&
      (newGuest[key] = value as any)
    );

    if (!newGuest.name) {
      return { guests: [] };
    }

    guestsData = await drizzle.select({
      email: guests.email,
      name: guests.name,
    }).from(guests).where(like(guests.name, `${newGuest.name}`));
}

  return { guests: guestsData };
}

export default function GuestsAutocomplete(
  { guests = [] }: SectionProps<typeof loader>,
) {
  const searchUrl = useSection<Props>({
    props: { mode: "search" },
  });

  return (
    <>
      <div>
        <form
          class="p-2 flex flex-col gap-2"
        >
          <div class="flex gap-2">
            <label for="name">Name</label>
            <input
              name="search"
              id="search"
              hx-post={searchUrl}
              hx-trigger="input changed delay:500ms, search"
              hx-target="closest section"
              hx-swap="outerHTML"
              required
              class="border border-gray-300 rounded"
            />
          </div>
        </form>
      </div>

      <div class="divide-y divide-gray-300 p-2 w-fit">
        {guests.map((guest) => {
          const confirmUrl = useSection<Props>({
            props: { mode: "confirm", email: guest.email ?? "" },
          });
          return (
            <div class="flex gap-2 items-center">
              <span>{guest.name}</span>
              <span>{guest.email}</span>
              <form
                hx-post={confirmUrl}
                hx-trigger="click"
                hx-target="closest section"
                hx-swap="outerHTML"
                class="w-4 h-4"
              >
                <button type="submit">Confirmar presença</button>
              </form>
            </div>
          );
        })}
      </div>
    </>
  );
}