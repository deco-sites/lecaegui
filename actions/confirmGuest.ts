import { doc } from "site/static/googleCreds.ts";

export interface Props {
    name: string
}

export interface Result {
    status: "ok" | "fail"
}

export default async function confirmGuest(props: Props): Promise<Result> {
    try {
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        const { name } = props;

        const guestRow = rows.find(row => row.get('Nome') === name);

        if (guestRow) {
            guestRow.set('Confirmed', 'Sim');
            await guestRow.save();
            return { status: "ok" };
        } else {
            return { status: "fail" };
        }
    } catch (error) {
        console.error('Error confirming guest:', error);
        return { status: "fail" };
    }
}