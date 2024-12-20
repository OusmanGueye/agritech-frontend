import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { ICalendrier, NewCalendrier } from '../calendrier.model';
import {ApplicationConfigService} from "../../../core/config/application-config.service";
import {createRequestOption} from "../../../core/request/request-util";
import {isPresent} from "../../../core/util/operators";
import {DATE_FORMAT} from "../../../config/input.constants";

export type PartialUpdateCalendrier = Partial<ICalendrier> & Pick<ICalendrier, 'id'>;

type RestOf<T extends ICalendrier | NewCalendrier> = Omit<T, 'dateDebut' | 'dateFin'> & {
  dateDebut?: string | null;
  dateFin?: string | null;
};

export type RestCalendrier = RestOf<ICalendrier>;

export type NewRestCalendrier = RestOf<NewCalendrier>;

export type PartialUpdateRestCalendrier = RestOf<PartialUpdateCalendrier>;

export type EntityResponseType = HttpResponse<ICalendrier>;
export type EntityArrayResponseType = HttpResponse<ICalendrier[]>;

@Injectable({ providedIn: 'root' })
export class CalendrierService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/calendriers');

  create(calendrier: NewCalendrier): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(calendrier);
    return this.http
      .post<RestCalendrier>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(calendrier: ICalendrier): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(calendrier);
    return this.http
      .put<RestCalendrier>(`${this.resourceUrl}/${this.getCalendrierIdentifier(calendrier)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(calendrier: PartialUpdateCalendrier): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(calendrier);
    return this.http
      .patch<RestCalendrier>(`${this.resourceUrl}/${this.getCalendrierIdentifier(calendrier)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCalendrier>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCalendrier[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCalendrierIdentifier(calendrier: Pick<ICalendrier, 'id'>): number {
    return calendrier.id;
  }

  compareCalendrier(o1: Pick<ICalendrier, 'id'> | null, o2: Pick<ICalendrier, 'id'> | null): boolean {
    return o1 && o2 ? this.getCalendrierIdentifier(o1) === this.getCalendrierIdentifier(o2) : o1 === o2;
  }

  addCalendrierToCollectionIfMissing<Type extends Pick<ICalendrier, 'id'>>(
    calendrierCollection: Type[],
    ...calendriersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const calendriers: Type[] = calendriersToCheck.filter(isPresent);
    if (calendriers.length > 0) {
      const calendrierCollectionIdentifiers = calendrierCollection.map(calendrierItem => this.getCalendrierIdentifier(calendrierItem));
      const calendriersToAdd = calendriers.filter(calendrierItem => {
        const calendrierIdentifier = this.getCalendrierIdentifier(calendrierItem);
        if (calendrierCollectionIdentifiers.includes(calendrierIdentifier)) {
          return false;
        }
        calendrierCollectionIdentifiers.push(calendrierIdentifier);
        return true;
      });
      return [...calendriersToAdd, ...calendrierCollection];
    }
    return calendrierCollection;
  }

  protected convertDateFromClient<T extends ICalendrier | NewCalendrier | PartialUpdateCalendrier>(calendrier: T): RestOf<T> {
    return {
      ...calendrier,
      dateDebut: calendrier.dateDebut?.format(DATE_FORMAT) ?? null,
      dateFin: calendrier.dateFin?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restCalendrier: RestCalendrier): ICalendrier {
    return {
      ...restCalendrier,
      dateDebut: restCalendrier.dateDebut ? dayjs(restCalendrier.dateDebut) : undefined,
      dateFin: restCalendrier.dateFin ? dayjs(restCalendrier.dateFin) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCalendrier>): HttpResponse<ICalendrier> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCalendrier[]>): HttpResponse<ICalendrier[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
