import { doc } from "site/googleCreds.ts";
import { AppContext } from "site/apps/site.ts";

export interface Props {
  name: string;
}

export interface Result {
  status: "ok" | "fail";
}

export default async function confirmGuest(
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<Result> {
  let sheet;
  let rows;

  console.log("DOC:", ctx.private_key?.get());

  try {
    if (ctx.private_key?.get() != null) {
      await ctx.doc?.loadInfo();
      sheet = ctx.doc?.sheetsByIndex[0];
      rows = await sheet?.getRows();
    } else {
      await doc.loadInfo();
      sheet = doc.sheetsByIndex[0];
      rows = await sheet.getRows();
    }

    const { name } = props;

    const guestRow = rows?.find((row) => row.get("Nome") === name);

    if (guestRow) {
      guestRow.set("Confirmed", "Sim");
      await guestRow.save();
      return { status: "ok" };
    } else {
      return { status: "fail" };
    }
  } catch (error) {
    console.error("Error confirming guest:", error);
    return { status: "fail" };
  }
}
