import { doc } from "site/googleCreds.ts";
import { AppContext } from "site/apps/site.ts";

export interface Guest {
  Nome: string;
  Email: string;
  Confirmed: string;
  ConfirmationDate: string;
  TrazMaisUm: string;
  NomeMaisUm: string;
  Papel: string;
  Origem: string;
  LecaGui: string;
  EMaisUm: string;
  PodemosCortar: string;
}

export interface GuestList {
  data: string[];
}

export interface Props {
  chrt?: string;
}

export default async function guests(
  _props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<GuestList> {
  let sheet;
  let rows;

  if (ctx.private_key?.get() != null) {
    await ctx.doc?.loadInfo();
    sheet = ctx.doc?.sheetsByIndex[0];
    rows = await sheet?.getRows();
  } else {
    await doc.loadInfo();
    sheet = doc.sheetsByIndex[0];
    rows = await sheet.getRows();
  }
  const filteredNames = rows?.filter((row) => row.get("É +1?") !== "Sim")
    .map((row) => row.get("Nome")) || [];

  return { data: filteredNames };
}
