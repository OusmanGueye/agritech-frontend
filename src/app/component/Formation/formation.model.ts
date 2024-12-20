import dayjs from 'dayjs/esm';
import {IEntreprise} from "../entreprise/entreprise.model";


export interface IFormation {
  id: number;
  titre?: string | null;
  description?: string | null;
  dateDebut?: dayjs.Dayjs | null;
  dateFin?: dayjs.Dayjs | null;
  isDelete?: boolean | null;
  entreprise?: Pick<IEntreprise, 'id'> | null;
}

export type NewFormation = Omit<IFormation, 'id'> & { id: null };
