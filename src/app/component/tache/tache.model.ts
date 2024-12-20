import dayjs from 'dayjs/esm';
import {TacheEtat} from "../enumerations/tache-etat.model";
import {IEntreprise} from "../entreprise/entreprise.model";
import {IEmploye} from "../employe/employe.model";


export interface ITache {
  id: number;
  description?: string | null;
  dateDebut?: dayjs.Dayjs | null;
  dateFin?: dayjs.Dayjs | null;
  etat?: keyof typeof TacheEtat | null;
  isDelete?: boolean | null;
  entreprise?: Pick<IEntreprise, 'id'> | null;
  employe?: Pick<IEmploye, 'id'> | null;
}

export type NewTache = Omit<ITache, 'id'> & { id: null };
