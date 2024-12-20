import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFounisseur, NewFounisseur } from '../founisseur.model';

export type PartialUpdateFounisseur = Partial<IFounisseur> & Pick<IFounisseur, 'id'>;

type RestOf<T extends IFounisseur | NewFounisseur> = Omit<T, 'dateCreation'> & {
  dateCreation?: string | null;
};

export type RestFounisseur = RestOf<IFounisseur>;

export type NewRestFounisseur = RestOf<NewFounisseur>;

export type PartialUpdateRestFounisseur = RestOf<PartialUpdateFounisseur>;

export type EntityResponseType = HttpResponse<IFounisseur>;
export type EntityArrayResponseType = HttpResponse<IFounisseur[]>;

@Injectable({ providedIn: 'root' })
export class FounisseurService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/founisseurs');

  create(founisseur: NewFounisseur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(founisseur);
    return this.http
      .post<RestFounisseur>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(founisseur: IFounisseur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(founisseur);
    return this.http
      .put<RestFounisseur>(`${this.resourceUrl}/${this.getFounisseurIdentifier(founisseur)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(founisseur: PartialUpdateFounisseur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(founisseur);
    return this.http
      .patch<RestFounisseur>(`${this.resourceUrl}/${this.getFounisseurIdentifier(founisseur)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestFounisseur>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFounisseur[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFounisseurIdentifier(founisseur: Pick<IFounisseur, 'id'>): number {
    return founisseur.id;
  }

  compareFounisseur(o1: Pick<IFounisseur, 'id'> | null, o2: Pick<IFounisseur, 'id'> | null): boolean {
    return o1 && o2 ? this.getFounisseurIdentifier(o1) === this.getFounisseurIdentifier(o2) : o1 === o2;
  }

  addFounisseurToCollectionIfMissing<Type extends Pick<IFounisseur, 'id'>>(
    founisseurCollection: Type[],
    ...founisseursToCheck: (Type | null | undefined)[]
  ): Type[] {
    const founisseurs: Type[] = founisseursToCheck.filter(isPresent);
    if (founisseurs.length > 0) {
      const founisseurCollectionIdentifiers = founisseurCollection.map(founisseurItem => this.getFounisseurIdentifier(founisseurItem));
      const founisseursToAdd = founisseurs.filter(founisseurItem => {
        const founisseurIdentifier = this.getFounisseurIdentifier(founisseurItem);
        if (founisseurCollectionIdentifiers.includes(founisseurIdentifier)) {
          return false;
        }
        founisseurCollectionIdentifiers.push(founisseurIdentifier);
        return true;
      });
      return [...founisseursToAdd, ...founisseurCollection];
    }
    return founisseurCollection;
  }

  protected convertDateFromClient<T extends IFounisseur | NewFounisseur | PartialUpdateFounisseur>(founisseur: T): RestOf<T> {
    return {
      ...founisseur,
      dateCreation: founisseur.dateCreation?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restFounisseur: RestFounisseur): IFounisseur {
    return {
      ...restFounisseur,
      dateCreation: restFounisseur.dateCreation ? dayjs(restFounisseur.dateCreation) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFounisseur>): HttpResponse<IFounisseur> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFounisseur[]>): HttpResponse<IFounisseur[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
