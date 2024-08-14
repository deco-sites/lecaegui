import { eq, ilike, like } from "drizzle-orm";
import { SectionProps } from "deco/types.ts";
import type { AppContext, RecordsApp } from "site/apps/deco/records.ts";
import { guests } from "site/db/schema.ts";
import { useSection } from "deco/hooks/useSection.ts";
import { useScript } from "deco/hooks/useScript.ts";
import { search } from "https://deno.land/x/inspect_vscode@0.2.1/search.ts";
import { useComponent } from "site/sections/Component.tsx";

const script = (formId: string, name: string) => {
  const input = document.getElementById(formId) as HTMLFormElement | null;
  input?.addEventListener("input", (e) => {
    e.preventDefault();
    const search_term = input?.value;
    console.log("search_term111", search_term);

    if (search_term) {
      console.log("search_term22", search_term);

      const urlSearchParams = new URLSearchParams(window.location.search);
      urlSearchParams.set(name, search_term);
      window.location.search = urlSearchParams.toString();
    }
  });
};

type GuestInsert = typeof guests.$inferInsert;
type GuestsKeys = keyof GuestInsert;
type GuestValue<K extends keyof GuestInsert> = GuestInsert[K];

/**
 * Checa se `key` é uma chave válida do tipo guest.
 */
const isGuestPropKey = (key: string): key is GuestsKeys =>
  key in guests.$inferInsert;

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

// Querystring param used when navigating the user
const Querystring = "search";
export async function loader(
  { mode = "search" }: Props,
  req: Request,
  { invoke }: AppContext,
) {
  const drizzle = await invoke.records.loaders.drizzle();

  let guestsData: Partial<typeof guests.$inferInsert>[] = [];

  // await drizzle
  //   .insert(guests)
  //   .values({ name: "Rafael Zanette", email: "rafael@gmail.com" });

  // await drizzle
  //   .insert(guests)
  //   .values({ name: "Anderson Moreira", email: "anderson@gmail.com" });

  // await drizzle
  //   .insert(guests)
  //   .values({ name: "Lucas Ribeiro", email: "lucas@gmail.com" });

  // await drizzle
  //   .insert(guests)
  //   .values({ name: "Igor Brasileiro", email: "igor@gmail.com" });

  const query = new URL(req.url).searchParams.get(Querystring ?? "search");

  guestsData = await drizzle
    .select({
      email: guests.email,
      name: guests.name,
    })
    .from(guests)
    .where(like(guests.name, `%${query}%`));

  return { guests: guestsData, searchValue: query };
}

export async function action(
  props: Props,
  req: Request,
  ctx: AppContext & RecordsApp,
): Promise<Props> {
  const form = await req.formData(); // Obtém os dados do banco de dados
  const email = `${form.get("email") ?? ""}`;
  console.log("email", email);
  if (!email) {
    console.log("Email is empty");
    return { ...props };
  }

  const drizzle = await ctx.invoke("records/loaders/drizzle.ts"); // Carrega o drizzle para interagir com o banco de dados

  try {
    await drizzle
      .update(guests)
      .set({
        name: "teste",
      })
      .where(eq(guests.email, email ?? ""));

    return { ...props };
  } catch (e) {
    console.log(e);
    ctx.monitoring?.logger?.error(e);
    return {
      ...props,
    };
  }
}

export default function GuestsAutocomplete(props: SectionProps<typeof loader>) {
  const searchUrl = useSection<Props>({
    props: { mode: "search" },
  });

  return (
    <div>
      <div id="page">
        <div class="flex gap-2">
          <label for={Querystring}>Buscar</label>
          <input
            name={Querystring}
            id={Querystring}
            value={props.searchValue ?? ""}
            hx-post={searchUrl}
            hx-trigger={`input changed delay:500ms`}
            hx-target="closest section"
            hx-swap="outerHTML"
            class="border border-gray-300 rounded"
          />
        </div>
      </div>

      <div class="divide-y divide-gray-300 p-2 w-fit">
        {props.guests.map((guest) => {
          return (
            <form
              hx-post={useComponent(import.meta.url, props)}
              hx-trigger="click"
              hx-target="closest section"
              hx-swap="outerHTML"
              class="flex flex-col gap-2"
            >
              <input type="text" value={guest.name ?? ""} disabled />
              <input type="email" value={guest.email ?? ""} disabled />

              <label>
                <input
                  type="checkbox"
                  name="confirmed"
                  checked={guest?.confirmed ?? false}
                />
                Confirmado?
              </label>

              <label>
                <input
                  type="checkbox"
                  name="plusOne"
                  checked={guest?.plusOne ?? false}
                />
                Tem convidado?
              </label>

              {guest?.plusOne && (
                <input
                  name="plusOneName"
                  value={guest?.plusOneName ?? ""}
                  placeholder="Plus One Name"
                />
              )}

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Confirmar presença
              </button>
            </form>
          );
        })}
      </div>
      {/* Send search events as the user types */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(
            script,
            Querystring,
            Querystring,
          ),
        }}
      />
    </div>
  );
}
