import dayjs from 'dayjs/esm';
import {StatutCommande} from "../enumerations/statut-commande.model";
import {IEntreprise} from "../entreprise/entreprise.model";
import {IClient} from "../client/client.model";

export interface ICommande {
  id: number;
  reference?: string | null;
  dateCommande?: dayjs.Dayjs | null;
  statut?: keyof typeof StatutCommande | null;
  montantTotal?: number | null;
  montantPaye?: number | null;
  montantRestant?: number | null;
  description?: string | null;
  isDelete?: boolean | null;
  entreprise?: Pick<IEntreprise, 'id'> | null;
  client?: Pick<IClient, 'id'> | null;
}

export type NewCommande = Omit<ICommande, 'id'> & { id: null };
