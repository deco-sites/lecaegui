import type { Handlers } from "$fresh/server.ts";

import type { AppContext } from "site/apps/site.ts";
import { guests } from "site/db/schema.ts";
import { RecordsApp } from "site/apps/deco/records.ts";

export const handler: Handlers<null, AppContext & RecordsApp> = {
  POST: async (req, ctx) => {
    // @ts-ignore:
    const drizzle = await ctx.invoke("records/loaders/drizzle.ts"); // Carrega o drizzle para interagir com o banco de dados

    await drizzle
      .insert(guests)
      .values({ name: "teste", email: "teste@gmail.com" });
      
    console.log("banco populado!");
    return new Response(null, {
      status: 201,
    });
  },
};
