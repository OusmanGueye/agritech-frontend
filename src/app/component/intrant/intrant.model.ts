import dayjs from 'dayjs/esm';
import {IntrantType} from "../enumerations/intrant-type.model";
import {IEntreprise} from "../entreprise/entreprise.model";
import {IStock} from "../stock/stock.model";

export interface IIntrant {
  id: number;
  nom?: string | null;
  type?: keyof typeof IntrantType | null;
  quantite?: number | null;
  dateExpiration?: dayjs.Dayjs | null;
  isDelete?: boolean | null;
  entreprise?: IEntreprise | null;
  stock?: IStock | null;
}

export type NewIntrant = Omit<IIntrant, 'id'> & { id: null };
