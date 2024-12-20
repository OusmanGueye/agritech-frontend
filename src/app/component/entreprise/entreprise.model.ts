export interface IEntreprise {
  id: number;
  nom?: string | null;
  localisation?: string | null;
  contact?: string | null;
  email?: string | null;
  isDelete?: boolean | null;
}

export type NewEntreprise = Omit<IEntreprise, 'id'> & { id: null };
