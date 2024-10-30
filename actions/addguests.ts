// import { doc } from "site/googleCreds.ts";
import { AppContext } from "site/apps/site.ts";

export interface Props {
  name: string;
  origin: string;
}

export interface Result {
  status: "ok" | "fail";
}

export default async function addGuest(
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<Result> {
  let sheet;
  let rows;

  try {
    if (ctx.private_key?.get() != null) {
      await ctx.doc?.loadInfo();
      sheet = ctx.doc?.sheetsByIndex[0];
      rows = await sheet?.getRows();
    } else {
      // await doc.loadInfo();
      // sheet = doc.sheetsByIndex[0];
      // rows = await sheet.getRows();
    }

    const { name, origin } = props;

    const guestRow = rows?.find((row) => row.get("Nome") === origin);

    if (guestRow) {
      guestRow.set("Traz +1", "Sim");
      guestRow.save();

      await sheet?.addRow({
        "Nome": name,
        "Origem": origin,
        "É +1": "Sim",
      });
    }
    return { status: "ok" };
  } catch (error) {
    console.error("Error confirming guest:", error);
    return { status: "fail" };
  }
}
