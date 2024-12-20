import {ISite} from "../site/site.model";
import {IEntreprise} from "../entreprise/entreprise.model";
import {TypeSol} from "../enumerations/type-sol.model";


export interface IParcelle {
  id: number;
  nom?: string | null;
  numero?: number | null;
  superficie?: number | null;
  typeSol?: keyof typeof TypeSol | null;
  isDisponible?: boolean | null;
  isCultuve?: boolean | null;
  isDelete?: boolean | null;
  entreprise?: IEntreprise | null;
  sites?: ISite | null;
}

export type NewParcelle = Omit<IParcelle, 'id'> & { id: null };
