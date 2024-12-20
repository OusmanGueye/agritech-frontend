import dayjs from 'dayjs/esm';
import {TypeObservation} from "../enumerations/type-observation.model";
import {IEntreprise} from "../entreprise/entreprise.model";
import {ICulture} from "../culture/culture.model";


export interface IObservation {
  id: number;
  dateObservation?: dayjs.Dayjs | null;
  description?: string | null;
  typeObservation?: keyof typeof TypeObservation | null;
  mesureCapteur?: string | null;
  isDelete?: boolean | null;
  entreprise?: Pick<IEntreprise, 'id'> | null;
  culture?: Pick<ICulture, 'id'> | null;
}

export type NewObservation = Omit<IObservation, 'id'> & { id: null };
