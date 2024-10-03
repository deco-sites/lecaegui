import { doc } from "site/static/googleCreds.ts";

export interface Props {
  name: string;
  origin: string;
}

export interface Result {
  status: "ok" | "fail";
}

export default async function addGuest(props: Props): Promise<Result> {
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const { name, origin } = props;

    const guestRow = rows.find((row) => row.get("Nome") === origin);

    if (guestRow) {
      guestRow.set("Traz +1", "Sim");
      guestRow.save();

      await sheet.addRow({
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
