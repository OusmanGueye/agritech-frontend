import dayjs from 'dayjs/esm';
import {EtatPaiement} from "../enumerations/etat-paiement.model";
import {IFounisseur} from "../fournisseur/founisseur.model";


export interface IFactureFournisseur {
  id: number;
  numeroFacture?: string | null;
  dateFacture?: dayjs.Dayjs | null;
  montant?: number | null;
  datePaiement?: dayjs.Dayjs | null;
  description?: string | null;
  etatPaiement?: keyof typeof EtatPaiement | null;
  isDelete?: boolean | null;
  fournisseur?: Pick<IFounisseur, 'id'> | null;
}

export type NewFactureFournisseur = Omit<IFactureFournisseur, 'id'> & { id: null };
