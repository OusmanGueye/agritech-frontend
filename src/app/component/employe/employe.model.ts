import dayjs from 'dayjs/esm';
import {IUser} from "../user/user.model";
import {IEntreprise} from "../entreprise/entreprise.model";

export interface IEmploye {
  id: number;
  nom?: string | null;
  poste?: string | null;
  salaire?: number | null;
  contrat?: string | null;
  isDelete?: boolean | null;
  telephone?: string | null;
  imageUrl?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  dateCreation?: dayjs.Dayjs | null;
  user?: IUser | null;
  entreprise?: IEntreprise | null;
}

export type NewEmploye = Omit<IEmploye, 'id'> & { id: null };
