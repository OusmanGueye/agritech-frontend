import dayjs from 'dayjs/esm';
import {ICompte} from "../comptabilite/compte/compte.model";

export interface IClient {
  id: number;
  nom?: string | null;
  contact?: string | null;
  localisation?: string | null;
  email?: string | null;
  isDelete?: boolean | null;
  dateCreation?: dayjs.Dayjs | null;
  compte?: ICompte | null;
}

export type NewClient = Omit<IClient, 'id'> & { id: null };
