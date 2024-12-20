import dayjs from 'dayjs/esm';
import { IEntreprise } from 'app/entities/entreprise/entreprise.model';
import { ICulture } from 'app/entities/culture/culture.model';
import { ICompte } from 'app/entities/compte/compte.model';
import { TransactionType } from 'app/entities/enumerations/transaction-type.model';

export interface ITransaction {
  id: number;
  type?: keyof typeof TransactionType | null;
  montant?: number | null;
  date?: dayjs.Dayjs | null;
  description?: string | null;
  isDelete?: boolean | null;
  entreprise?: Pick<IEntreprise, 'id'> | null;
  culture?: Pick<ICulture, 'id'> | null;
  compte?: Pick<ICompte, 'id'> | null;
}

export type NewTransaction = Omit<ITransaction, 'id'> & { id: null };
