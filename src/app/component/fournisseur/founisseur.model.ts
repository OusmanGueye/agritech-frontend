import dayjs from 'dayjs/esm';
import {ICompte} from "../comptabilite/compte/compte.model";


export interface IFounisseur {
  id: number;
  nom?: string | null;
  contact?: string | null;
  localisation?: string | null;
  email?: string | null;
  isDelete?: boolean | null;
  dateCreation?: dayjs.Dayjs | null;
  compte?: Pick<ICompte, 'id'> | null;
}

export type NewFounisseur = Omit<IFounisseur, 'id'> & { id: null };
