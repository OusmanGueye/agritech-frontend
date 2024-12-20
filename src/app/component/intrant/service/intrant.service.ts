import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { IIntrant, NewIntrant } from '../intrant.model';
import {ApplicationConfigService} from "../../../core/config/application-config.service";
import {createRequestOption} from "../../../core/request/request-util";
import {isPresent} from "../../../core/util/operators";
import {DATE_FORMAT} from "../../../config/input.constants";

export type PartialUpdateIntrant = Partial<IIntrant> & Pick<IIntrant, 'id'>;

type RestOf<T extends IIntrant | NewIntrant> = Omit<T, 'dateExpiration'> & {
  dateExpiration?: string | null;
};

export type RestIntrant = RestOf<IIntrant>;

export type NewRestIntrant = RestOf<NewIntrant>;

export type PartialUpdateRestIntrant = RestOf<PartialUpdateIntrant>;

export type EntityResponseType = HttpResponse<IIntrant>;
export type EntityArrayResponseType = HttpResponse<IIntrant[]>;

@Injectable({ providedIn: 'root' })
export class IntrantService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/intrants');

  create(intrant: NewIntrant): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(intrant);
    return this.http
      .post<RestIntrant>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(intrant: IIntrant): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(intrant);
    return this.http
      .put<RestIntrant>(`${this.resourceUrl}/${this.getIntrantIdentifier(intrant)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(intrant: PartialUpdateIntrant): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(intrant);
    return this.http
      .patch<RestIntrant>(`${this.resourceUrl}/${this.getIntrantIdentifier(intrant)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestIntrant>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestIntrant[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getIntrantIdentifier(intrant: Pick<IIntrant, 'id'>): number {
    return intrant.id;
  }

  compareIntrant(o1: Pick<IIntrant, 'id'> | null, o2: Pick<IIntrant, 'id'> | null): boolean {
    return o1 && o2 ? this.getIntrantIdentifier(o1) === this.getIntrantIdentifier(o2) : o1 === o2;
  }

  addIntrantToCollectionIfMissing<Type extends Pick<IIntrant, 'id'>>(
    intrantCollection: Type[],
    ...intrantsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const intrants: Type[] = intrantsToCheck.filter(isPresent);
    if (intrants.length > 0) {
      const intrantCollectionIdentifiers = intrantCollection.map(intrantItem => this.getIntrantIdentifier(intrantItem));
      const intrantsToAdd = intrants.filter(intrantItem => {
        const intrantIdentifier = this.getIntrantIdentifier(intrantItem);
        if (intrantCollectionIdentifiers.includes(intrantIdentifier)) {
          return false;
        }
        intrantCollectionIdentifiers.push(intrantIdentifier);
        return true;
      });
      return [...intrantsToAdd, ...intrantCollection];
    }
    return intrantCollection;
  }

  protected convertDateFromClient<T extends IIntrant | NewIntrant | PartialUpdateIntrant>(intrant: T): RestOf<T> {
    return {
      ...intrant,
      dateExpiration: intrant.dateExpiration?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restIntrant: RestIntrant): IIntrant {
    return {
      ...restIntrant,
      dateExpiration: restIntrant.dateExpiration ? dayjs(restIntrant.dateExpiration) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestIntrant>): HttpResponse<IIntrant> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestIntrant[]>): HttpResponse<IIntrant[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }


  getAllIntrats(): Observable<EntityArrayResponseType> {
    return this.http.get<IIntrant[]>(`${this.resourceUrl}/get-all`, { observe: 'response' });
  }

  createIntrant(intrant: IIntrant, stockId: number): Observable<EntityResponseType> {
    return this.http.post<IIntrant>(`${this.resourceUrl}/create/${stockId}`, intrant, { observe: 'response' });
  }
}
