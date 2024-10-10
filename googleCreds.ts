import creds from "site/static/lecaegui-ebd973469e8e.json" with { type: "json" };
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file',
];
const jwt = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: SCOPES,
});

export const doc = new GoogleSpreadsheet('1_nIZM0ZGiw_zoEE6CLBamVZevr6NMTZkronP7mj1O7I', jwt);
