import {IAdmin} from "../../admin/admin.model";
import {TypeCompte} from "../../enumerations/type-compte.model";
import {IEmploye} from "../../employe/employe.model";


export interface ICompte {
  id: number;
  nom?: string | null;
  typeCompte?: keyof typeof TypeCompte | null;
  solde?: number | null;
  description?: string | null;
  isDelete?: boolean | null;
  employe?: Pick<IEmploye, 'id'> | null;
  admin?: Pick<IAdmin, 'id'> | null;
}

export type NewCompte = Omit<ICompte, 'id'> & { id: null };
