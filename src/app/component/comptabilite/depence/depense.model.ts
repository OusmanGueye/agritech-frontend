import dayjs from 'dayjs/esm';
import {TypeDepense} from "../../enumerations/type-depense.model";
import {IEntreprise} from "../../entreprise/entreprise.model";
import {ICulture} from "../../culture/culture.model";

export interface IDepense {
  id: number;
  typeDepense?: keyof typeof TypeDepense | null;
  montant?: number | null;
  description?: string | null;
  dateDepense?: dayjs.Dayjs | null;
  isDelete?: boolean | null;
  entreprise?: Pick<IEntreprise, 'id'> | null;
  culture?: Pick<ICulture, 'id'> | null;
}

export type NewDepense = Omit<IDepense, 'id'> & { id: null };
