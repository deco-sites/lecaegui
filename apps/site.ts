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

  const jwt = new JWT({
    email: state.client_email,
    key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNDxQNhwihqo1s\nO5FjtCS/266IjhNWKX28myHzRi5BpWhQbW6jtdNh3Nz9AYWUF1TMCYjcr2UVrveD\nLHWj3fORLUcWetc6LJwzN3onfyQw95NFMwNDh5LJBspqDT2MYZaG+Uz/PrJpU/dt\nsny3i4UdClLPU3EWwXvuTo0nUvUEnPs01vWl496PiEbFWUuq1RkvFm0C91+WdgFH\nzHR6ZAr1kzb3fN6VifMMP9N8itr89itLK488hysoIg3zyWpSBXBBBVWWmx/EBuDf\nO6y8kI3y+B9H1+WgnaG4IfHknHgBssVTsoY2yw773nhZ2AmF20qrJeU/yv3U0/ef\n8ig2eeTnAgMBAAECggEAAtb1yEwsycq/exaXKFd6ERLFo3sS3px9naK6EjMlkflb\ndX0jRKqDtLUiqNd+HrNj4SF4RW5dTxllbGnpPJx34WNdXONMicmZoVuK0a8A9Kro\nf6APDr7HyYAFm4HD5kStbqtGR+1opQaP83M+4tUDsRBLgGobTT9Wn1G4BsNZ5tDL\nezF4cxY4X5Y4G/46KTTZHI//OvmqwbZPjgwBg96lRPjYW6aBn8+QIA7nWRTKSvBS\nVOnyqN3jLRM7K3zfwAM4VAJKnY2VWwyBQptMhJ/v8sL3Dhx7yfZzdNvmwp6QNojZ\nWyjWlukqh0z2gwYkXtbXtkJDTLz+ALEa3OAKWpaxDQKBgQD2/s/rVTq0FDLtTJGF\nyZsNfF2GLU/L1DWX/EqabSdKjPmP7Bt/AIbmHsWFAF30ox1b76N6/gVN+PMtHMhs\nWNORAh3XdxsFRLWPp9zIz6gm1TA3E8J1FcqC0dNWuL9sN9vUIYI7YmnIniou8nkF\nPoifpyxvVlG//i7V6tQGpmFBPQKBgQDUiOBkxOSNtCK1hw1myvzIpXsyD9ZrpP2z\nce/G4xQYBl5v2nqd2+QbOQcMwcVUeTWZ/R475kVgH60th7g3S18AazGO4mnCyEhA\nMdNLfI1NA/eqq9TkUfdhZnSMhqC9NoE7dDugkOIO63xlKdhihkJUup+wPo736sYD\n74Pp5GxY8wKBgE4DlfCi7vPKHXvOX3h+gTb1PSUQUs/yqyriST4Vk/98H6dR0C2B\nIRq2RXUI9KQ8kR1kx6Ilcc96/nQVT0jJlamLnZlcyXAUj7RcNORIkrgRRjVfTGBn\nDZvcYoBVwkCQNCMAon3XS8pOCszhUVBSvByRVPulrBSUWH7AuU+QZc+RAoGAcLnI\niqoDr0UDw9RFv2eae7GJjhvoVl/EUBD2ZD68waFfJWRz9JZUfjvZCWMdDpjbXTlr\nd8nCsiEa8TMy+eD4GnjAaFCeV7ly2NmUgE0nhNm92sAYwqDW3MpCtuYRC0qFcMtN\ndPRjchZkfCOdqWQcemQhnpEPs17Kd/vps3x8GxECgYEAmlr1gUOB02PHfUpNcyky\nOPohHi5uaUnqU3uS0x1HdzM8Jb85Nst/nqgWIYfeYdq6oIrjjKHEyCswpKByqwa4\nvHucyGbrqNyzpo76ZXx/XUMnvucddg59gEEWfY/X2LggB/R/S8zW2x//er5VzKkH\nb0fKcbHmloTXAUG2z8JAEUY=\n-----END PRIVATE KEY-----\n",
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
