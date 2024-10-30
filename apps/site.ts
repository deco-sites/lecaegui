import website, { Props as WebsiteProps } from "apps/website/mod.ts";
import manifest, { Manifest } from "../manifest.gen.ts";
import { type App, type AppContext as AC } from "@deco/deco";
import { Secret } from "apps/website/loaders/secret.ts";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

interface MinhasProps extends WebsiteProps {
  client_email?: string;
  private_key?: Secret;
  doc?: GoogleSpreadsheet;
}

type WebsiteApp = ReturnType<typeof website>;
/**
 * @title Site
 * @description Start your site from a template or from scratch.
 * @category Tool
 * @logo https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1/0ac02239-61e6-4289-8a36-e78c0975bcc8
 */
export default function Site(
  state: MinhasProps,
): App<Manifest, MinhasProps, [WebsiteApp]> {
  const SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
  ];

  console.log("CHAVE_SECRETA", state.private_key?.get());
  console.log("STATE", state);

  const jwt = new JWT({
    email: state.client_email,
    key: state.private_key?.get() || "",
    scopes: SCOPES,
  });

  const doc = new GoogleSpreadsheet(
    "1_nIZM0ZGiw_zoEE6CLBamVZevr6NMTZkronP7mj1O7I",
    jwt,
  );

  return {
    state: {
      ...state,
      doc,
    },
    manifest,
    dependencies: [
      website(state),
    ],
  };
}
export type SiteApp = ReturnType<typeof Site>;
export type AppContext = AC<SiteApp>;
export { onBeforeResolveProps, Preview } from "apps/website/mod.ts";
