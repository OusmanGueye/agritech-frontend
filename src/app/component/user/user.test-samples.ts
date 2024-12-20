import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 20925,
  login: '&_A@IuM8\\dO\\SZU\\c1u\\3daMs\\MByv',
};

export const sampleWithPartialData: IUser = {
  id: 12322,
  login: 'JvFh',
};

export const sampleWithFullData: IUser = {
  id: 13409,
  login: 'ZZ',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
