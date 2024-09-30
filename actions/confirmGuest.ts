import creds from "../static/lecaegui-ebd973469e8e.json" with { type: "json" }
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export interface Props {
    name: string
}

export interface Result {
    status: "ok" | "fail"
}

const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file',
];

const jwt = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: SCOPES,
});

const doc = new GoogleSpreadsheet('1_nIZM0ZGiw_zoEE6CLBamVZevr6NMTZkronP7mj1O7I', jwt);

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