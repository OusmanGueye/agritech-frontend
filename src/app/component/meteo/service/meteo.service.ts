import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';


import { IMeteo, NewMeteo } from '../meteo.model';
import {ApplicationConfigService} from "../../../core/config/application-config.service";
import {createRequestOption} from "../../../core/request/request-util";
import {isPresent} from "../../../core/util/operators";
import {DATE_FORMAT} from "../../../config/input.constants";

export type PartialUpdateMeteo = Partial<IMeteo> & Pick<IMeteo, 'id'>;

type RestOf<T extends IMeteo | NewMeteo> = Omit<T, 'date'> & {
  date?: string | null;
};

export type RestMeteo = RestOf<IMeteo>;

export type NewRestMeteo = RestOf<NewMeteo>;

export type PartialUpdateRestMeteo = RestOf<PartialUpdateMeteo>;

export type EntityResponseType = HttpResponse<IMeteo>;
export type EntityArrayResponseType = HttpResponse<IMeteo[]>;

@Injectable({ providedIn: 'root' })
export class MeteoService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/meteos');

  create(meteo: NewMeteo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(meteo);
    return this.http.post<RestMeteo>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(meteo: IMeteo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(meteo);
    return this.http
      .put<RestMeteo>(`${this.resourceUrl}/${this.getMeteoIdentifier(meteo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(meteo: PartialUpdateMeteo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(meteo);
    return this.http
      .patch<RestMeteo>(`${this.resourceUrl}/${this.getMeteoIdentifier(meteo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestMeteo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestMeteo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMeteoIdentifier(meteo: Pick<IMeteo, 'id'>): number {
    return meteo.id;
  }

  compareMeteo(o1: Pick<IMeteo, 'id'> | null, o2: Pick<IMeteo, 'id'> | null): boolean {
    return o1 && o2 ? this.getMeteoIdentifier(o1) === this.getMeteoIdentifier(o2) : o1 === o2;
  }

  addMeteoToCollectionIfMissing<Type extends Pick<IMeteo, 'id'>>(
    meteoCollection: Type[],
    ...meteosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const meteos: Type[] = meteosToCheck.filter(isPresent);
    if (meteos.length > 0) {
      const meteoCollectionIdentifiers = meteoCollection.map(meteoItem => this.getMeteoIdentifier(meteoItem));
      const meteosToAdd = meteos.filter(meteoItem => {
        const meteoIdentifier = this.getMeteoIdentifier(meteoItem);
        if (meteoCollectionIdentifiers.includes(meteoIdentifier)) {
          return false;
        }
        meteoCollectionIdentifiers.push(meteoIdentifier);
        return true;
      });
      return [...meteosToAdd, ...meteoCollection];
    }
    return meteoCollection;
  }

  protected convertDateFromClient<T extends IMeteo | NewMeteo | PartialUpdateMeteo>(meteo: T): RestOf<T> {
    return {
      ...meteo,
      date: meteo.date?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restMeteo: RestMeteo): IMeteo {
    return {
      ...restMeteo,
      date: restMeteo.date ? dayjs(restMeteo.date) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestMeteo>): HttpResponse<IMeteo> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestMeteo[]>): HttpResponse<IMeteo[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
