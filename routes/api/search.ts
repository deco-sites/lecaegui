import type { Handlers } from "$fresh/server.ts";

import type { DecoState, LoaderContext } from "deco/types.ts";
import type { Manifest as ManifestResend } from "apps/resend/manifest.gen.ts";
import type { AppContext } from "site/apps/site.ts";
import { guests } from "site/db/schema.ts";
import { ilike, like } from "drizzle-orm";

export const handler: Handlers<null, DecoState> = {
  POST: async (req, ctx) => {
    console.log("Recaptcha token:", "aaa");

    // const drizzle = await ctx.state.invoke.records.loaders.drizzle();
    const formData = Object.fromEntries((await req.formData()).entries());
    console.log("drizzle", formData);

    // let guestsData: Partial<typeof guests.$inferInsert>[] = [];

    // guestsData = await drizzle
    //   // @ts-ignore
    //   .select({
    //     email: guests.email,
    //     name: guests.name,
    //   })
    //   .from(guests)
    //   .where(like(guests.name, `%gu%`));
    // console.log("Email enviado com sucesso!", guestsData);

    return new Response(null, {
      headers: {
        Location: `/agende-sua-consulta?status=success`,
      },
      status: 302,
    });
  },
};
