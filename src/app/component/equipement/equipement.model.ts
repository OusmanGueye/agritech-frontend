import {EquipementType} from "../enumerations/equipement-type.model";
import {IEntreprise} from "../entreprise/entreprise.model";
import {ISite} from "../site/site.model";


export interface IEquipement {
  id: number;
  nom?: string | null;
  type?: keyof typeof EquipementType | null;
  etat?: string | null;
  dateDerniereMaintenance?: Date | null;
  isDelete?: boolean | null;
  entreprise?: IEntreprise| null;
  sites?: ISite | null;
}

export type NewEquipement = Omit<IEquipement, 'id'> & { id: null };
