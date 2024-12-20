import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';


import { ICulture, NewCulture } from '../culture.model';
import {ApplicationConfigService} from "../../../core/config/application-config.service";
import {createRequestOption} from "../../../core/request/request-util";
import {isPresent} from "../../../core/util/operators";
import {DATE_FORMAT} from "../../../config/input.constants";

export type PartialUpdateCulture = Partial<ICulture> & Pick<ICulture, 'id'>;

type RestOf<T extends ICulture | NewCulture> = Omit<T, 'dateSemis' | 'dateRecolte'> & {
  dateSemis?: string | null;
  dateRecolte?: string | null;
};

export type RestCulture = RestOf<ICulture>;

export type NewRestCulture = RestOf<NewCulture>;

export type PartialUpdateRestCulture = RestOf<PartialUpdateCulture>;

export type EntityResponseType = HttpResponse<ICulture>;
export type EntityArrayResponseType = HttpResponse<ICulture[]>;

@Injectable({ providedIn: 'root' })
export class CultureService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cultures');

  create(culture: NewCulture): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(culture);
    return this.http
      .post<RestCulture>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(culture: ICulture): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(culture);
    return this.http
      .put<RestCulture>(`${this.resourceUrl}/${this.getCultureIdentifier(culture)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(culture: PartialUpdateCulture): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(culture);
    return this.http
      .patch<RestCulture>(`${this.resourceUrl}/${this.getCultureIdentifier(culture)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCulture>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCulture[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCultureIdentifier(culture: Pick<ICulture, 'id'>): number {
    return culture.id;
  }

  compareCulture(o1: Pick<ICulture, 'id'> | null, o2: Pick<ICulture, 'id'> | null): boolean {
    return o1 && o2 ? this.getCultureIdentifier(o1) === this.getCultureIdentifier(o2) : o1 === o2;
  }

  addCultureToCollectionIfMissing<Type extends Pick<ICulture, 'id'>>(
    cultureCollection: Type[],
    ...culturesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cultures: Type[] = culturesToCheck.filter(isPresent);
    if (cultures.length > 0) {
      const cultureCollectionIdentifiers = cultureCollection.map(cultureItem => this.getCultureIdentifier(cultureItem));
      const culturesToAdd = cultures.filter(cultureItem => {
        const cultureIdentifier = this.getCultureIdentifier(cultureItem);
        if (cultureCollectionIdentifiers.includes(cultureIdentifier)) {
          return false;
        }
        cultureCollectionIdentifiers.push(cultureIdentifier);
        return true;
      });
      return [...culturesToAdd, ...cultureCollection];
    }
    return cultureCollection;
  }

  protected convertDateFromClient<T extends ICulture | NewCulture | PartialUpdateCulture>(culture: T): RestOf<T> {
    return {
      ...culture,
      dateSemis: culture.dateSemis?.format(DATE_FORMAT) ?? null,
      dateRecolte: culture.dateRecolte?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restCulture: RestCulture): ICulture {
    return {
      ...restCulture,
      dateSemis: restCulture.dateSemis ? dayjs(restCulture.dateSemis) : undefined,
      dateRecolte: restCulture.dateRecolte ? dayjs(restCulture.dateRecolte) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCulture>): HttpResponse<ICulture> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCulture[]>): HttpResponse<ICulture[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }


  getAllCulture(): Observable<EntityArrayResponseType> {
    return this.http.get<ICulture[]>(`${this.resourceUrl}/get-all`, { observe: 'response' });
  }

  createCulture(culture: NewCulture, idParcelle: number): Observable<EntityResponseType> {
    return this.http.post<ICulture>(`${this.resourceUrl}/create/${idParcelle}`, culture, { observe: 'response' });
  }

}
