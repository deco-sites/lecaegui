import { Deco } from "@deco/deco";

import { bindings as HTMX } from "@deco/deco/htmx";
import "deco/runtime/htmx/FreshHeadCompat.ts";
import { Layout } from "./_app.tsx";
import manifest, { Manifest } from "./manifest.gen.ts";

const deco = await Deco.init<Manifest>({
    manifest,
    bindings: HTMX({
        Layout,
    }),
});

const envPort = Deno.env.get("PORT");
Deno.serve({ handler: deco.fetch.bind(deco), port: envPort ? +envPort : 8000 });
