import dayjs from 'dayjs/esm';
import {TypeEvenement} from "../enumerations/type-evenement.model";
import {IEntreprise} from "../entreprise/entreprise.model";
import {ICulture} from "../culture/culture.model";
import {IParcelle} from "../parcelle/parcelle.model";


export interface ICalendrier {
  id: number;
  titre?: string | null;
  description?: string | null;
  dateDebut?: dayjs.Dayjs | null;
  dateFin?: dayjs.Dayjs | null;
  typeEvenement?: keyof typeof TypeEvenement | null;
  isDelete?: boolean | null;
  entreprise?: Pick<IEntreprise, 'id'> | null;
  culture?: Pick<ICulture, 'id'> | null;
  parcelle?: Pick<IParcelle, 'id'> | null;
}

export type NewCalendrier = Omit<ICalendrier, 'id'> & { id: null };
