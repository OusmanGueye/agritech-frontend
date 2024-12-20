import {IEntreprise} from "../entreprise/entreprise.model";
import {ISite} from "../site/site.model";


export interface IStock {
  id: number;
  nom?: string | null;
  emplacement?: string | null;
  capacite?: number | null;
  quantite?: number | null;
  quantiteRestante?: number | null;
  isDelete?: boolean | null;
  entreprise?: IEntreprise | null;
  sites?: ISite | null;
}

export type NewStock = Omit<IStock, 'id'> & { id: null };
