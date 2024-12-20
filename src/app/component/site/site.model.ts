
import {TypeSite} from "../enumerations/type-site.model";
import {IEntreprise} from "../entreprise/entreprise.model";


export interface ISite {
  id: number;
  nom?: string | null;
  reference?: string | null;
  localisation?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  typeSite?: keyof typeof TypeSite | null;
  isDelete?: boolean | null;
  isDisponible?: boolean | null;
  entreprise?: Pick<IEntreprise, 'id'> | null;
}

export type NewSite = Omit<ISite, 'id'> & { id: null };
