import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITache, NewTache } from '../tache.model';

export type PartialUpdateTache = Partial<ITache> & Pick<ITache, 'id'>;

type RestOf<T extends ITache | NewTache> = Omit<T, 'dateDebut' | 'dateFin'> & {
  dateDebut?: string | null;
  dateFin?: string | null;
};

export type RestTache = RestOf<ITache>;

export type NewRestTache = RestOf<NewTache>;

export type PartialUpdateRestTache = RestOf<PartialUpdateTache>;

export type EntityResponseType = HttpResponse<ITache>;
export type EntityArrayResponseType = HttpResponse<ITache[]>;

@Injectable({ providedIn: 'root' })
export class TacheService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/taches');

  create(tache: NewTache): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tache);
    return this.http.post<RestTache>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(tache: ITache): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tache);
    return this.http
      .put<RestTache>(`${this.resourceUrl}/${this.getTacheIdentifier(tache)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(tache: PartialUpdateTache): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tache);
    return this.http
      .patch<RestTache>(`${this.resourceUrl}/${this.getTacheIdentifier(tache)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTache>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTache[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTacheIdentifier(tache: Pick<ITache, 'id'>): number {
    return tache.id;
  }

  compareTache(o1: Pick<ITache, 'id'> | null, o2: Pick<ITache, 'id'> | null): boolean {
    return o1 && o2 ? this.getTacheIdentifier(o1) === this.getTacheIdentifier(o2) : o1 === o2;
  }

  addTacheToCollectionIfMissing<Type extends Pick<ITache, 'id'>>(
    tacheCollection: Type[],
    ...tachesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const taches: Type[] = tachesToCheck.filter(isPresent);
    if (taches.length > 0) {
      const tacheCollectionIdentifiers = tacheCollection.map(tacheItem => this.getTacheIdentifier(tacheItem));
      const tachesToAdd = taches.filter(tacheItem => {
        const tacheIdentifier = this.getTacheIdentifier(tacheItem);
        if (tacheCollectionIdentifiers.includes(tacheIdentifier)) {
          return false;
        }
        tacheCollectionIdentifiers.push(tacheIdentifier);
        return true;
      });
      return [...tachesToAdd, ...tacheCollection];
    }
    return tacheCollection;
  }

  protected convertDateFromClient<T extends ITache | NewTache | PartialUpdateTache>(tache: T): RestOf<T> {
    return {
      ...tache,
      dateDebut: tache.dateDebut?.format(DATE_FORMAT) ?? null,
      dateFin: tache.dateFin?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restTache: RestTache): ITache {
    return {
      ...restTache,
      dateDebut: restTache.dateDebut ? dayjs(restTache.dateDebut) : undefined,
      dateFin: restTache.dateFin ? dayjs(restTache.dateFin) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTache>): HttpResponse<ITache> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTache[]>): HttpResponse<ITache[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
