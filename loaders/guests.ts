import creds from "site/static/lecaegui-ebd973469e8e.json" with { type: "json" };
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet'; 

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
    data : string[]
}

export interface Props {
    chrt : string
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

export default async function guests(props : Props): Promise<GuestList> {

    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    const rows = await sheet.getRows()

    const filteredNames = rows
    .filter(row => !row.get('É +1?'))
    .map(row => row.get('Nome'));

    return {data: filteredNames};
}