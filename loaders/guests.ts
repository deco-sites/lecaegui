import { doc } from "site/static/googleCreds.ts";

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
    chrt? : string
}

export default async function guests(props : Props): Promise<GuestList> {
    
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const filteredNames = rows
        .filter(row => row.get('É +1?') !== 'Sim')
        .map(row => row.get('Nome'))
        .filter(name => name); 

    return { data: filteredNames };
}