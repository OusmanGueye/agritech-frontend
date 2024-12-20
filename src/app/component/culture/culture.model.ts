import dayjs from 'dayjs/esm';
import {TypeCulture} from "../enumerations/type-culture.model";
import {IEntreprise} from "../entreprise/entreprise.model";
import {IParcelle} from "../parcelle/parcelle.model";
import {IRecommandation} from "../recommandation/recommandation.model";

export interface ICulture {
  id: number;
  nom?: string | null;
  dateSemis?: dayjs.Dayjs | null;
  dateRecolte?: dayjs.Dayjs | null;
  quantiteProduite?: number | null;
  quantiteRestante?: number | null;
  typeCulture?: keyof typeof TypeCulture | null;
  isDelete?: boolean | null;
  rendement?: number | null;
  prixUnitaire?: number | null;
  quantiteEstimee?: number | null;
  depensesTotales?: number | null;
  margeTotale?: number | null;
  rentabilite?: number | null;
  cyclePersonnalise?: number | null;
  entreprise?: IEntreprise | null;
  parcelles?: IParcelle | null;
  recommandations?: IRecommandation | null;
 // produitsTransformes?: Pick<IProduitTransforme, 'id'>[] | null;
}

export type NewCulture = Omit<ICulture, 'id'> & { id: null };
