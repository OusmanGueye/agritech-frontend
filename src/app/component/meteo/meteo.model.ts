import dayjs from 'dayjs/esm';
import {IEntreprise} from "../entreprise/entreprise.model";

export interface IMeteo {
  id: number;
  localisation?: string | null;
  date?: dayjs.Dayjs | null;
  temperature?: number | null;
  precipitations?: number | null;
  alertes?: string | null;
  isDelete?: boolean | null;
  entreprise?: Pick<IEntreprise, 'id'> | null;
}

export type NewMeteo = Omit<IMeteo, 'id'> & { id: null };
