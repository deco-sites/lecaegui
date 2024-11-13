import { AppContext } from "site/apps/site.ts";

export interface DonorList {
  data: { names: string[]; donates: number[] };
}

export interface Props {
  tmp: string;
}

export default async function donates(
  _props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<DonorList> {
  let sheet;
  let rows;

  if (ctx.private_key?.get() != null) {
    await ctx.doc?.loadInfo();
    sheet = ctx.doc?.sheetsByIndex[0];
    rows = await sheet?.getRows();
  } else {
    // await doc.loadInfo();
    // sheet = doc.sheetsByIndex[0];
    // rows = await sheet.getRows();
  }
  const names = rows?.map((row) => row.get("Nome")) || [];
  const donates = rows?.map((row) => Number(row.get("Donation"))) || [];

  return { data: { names, donates } };
}
