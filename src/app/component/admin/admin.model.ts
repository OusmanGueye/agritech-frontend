import {Sexe} from "../enumerations/sexe.model";
import {IEntreprise} from "../entreprise/entreprise.model";
import {IUser} from "../user/user.model";


export interface IAdmin {
  id: number;
  nomComplet?: string | null;
  sexe?: keyof typeof Sexe | null;
  address?: string | null;
  email?: string | null;
  motDePasse?: string | null;
  isDelete?: boolean | null;
  telephone?: string | null;
  imageUrl?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  user?: IUser | null;
  entreprise?: IEntreprise | null;
}

export type NewAdmin = Omit<IAdmin, 'id'> & { id: null };
