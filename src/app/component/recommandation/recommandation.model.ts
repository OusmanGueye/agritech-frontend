import {TypeCulture} from "../enumerations/type-culture.model";
import {TypeSol} from "../enumerations/type-sol.model";
import {IEntreprise} from "../entreprise/entreprise.model";


export interface IRecommandation {
  id: number;
  typeCulture?: keyof typeof TypeCulture | null;
  typeSol?: keyof typeof TypeSol | null;
  besoinFertilisation?: string | null;
  besoinIrrigation?: string | null;
  rotationRecommandee?: string | null;
  notesSupplementaires?: string | null;
  cultureRecommandee?: string | null;
  isDelete?: boolean | null;
  entreprise?: IEntreprise | null;
}

export type NewRecommandation = Omit<IRecommandation, 'id'> & { id: null };
