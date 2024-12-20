import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IParcelle, NewParcelle } from '../parcelle.model';
import {ApplicationConfigService} from "../../../core/config/application-config.service";
import {isPresent} from "../../../core/util/operators";
import {createRequestOption} from "../../../core/request/request-util";
import {IIntrant} from "../../intrant/intrant.model";

export type PartialUpdateParcelle = Partial<IParcelle> & Pick<IParcelle, 'id'>;

export type EntityResponseType = HttpResponse<IParcelle>;
export type EntityArrayResponseType = HttpResponse<IParcelle[]>;

@Injectable({ providedIn: 'root' })
export class ParcelleService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/parcelles');

  create(parcelle: NewParcelle): Observable<EntityResponseType> {
    return this.http.post<IParcelle>(this.resourceUrl, parcelle, { observe: 'response' });
  }

  update(parcelle: IParcelle): Observable<EntityResponseType> {
    return this.http.put<IParcelle>(`${this.resourceUrl}/${this.getParcelleIdentifier(parcelle)}`, parcelle, { observe: 'response' });
  }

  partialUpdate(parcelle: PartialUpdateParcelle): Observable<EntityResponseType> {
    return this.http.patch<IParcelle>(`${this.resourceUrl}/${this.getParcelleIdentifier(parcelle)}`, parcelle, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParcelle>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParcelle[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getParcelleIdentifier(parcelle: Pick<IParcelle, 'id'>): number {
    return parcelle.id;
  }

  compareParcelle(o1: Pick<IParcelle, 'id'> | null, o2: Pick<IParcelle, 'id'> | null): boolean {
    return o1 && o2 ? this.getParcelleIdentifier(o1) === this.getParcelleIdentifier(o2) : o1 === o2;
  }

  addParcelleToCollectionIfMissing<Type extends Pick<IParcelle, 'id'>>(
    parcelleCollection: Type[],
    ...parcellesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const parcelles: Type[] = parcellesToCheck.filter(isPresent);
    if (parcelles.length > 0) {
      const parcelleCollectionIdentifiers = parcelleCollection.map(parcelleItem => this.getParcelleIdentifier(parcelleItem));
      const parcellesToAdd = parcelles.filter(parcelleItem => {
        const parcelleIdentifier = this.getParcelleIdentifier(parcelleItem);
        if (parcelleCollectionIdentifiers.includes(parcelleIdentifier)) {
          return false;
        }
        parcelleCollectionIdentifiers.push(parcelleIdentifier);
        return true;
      });
      return [...parcellesToAdd, ...parcelleCollection];
    }
    return parcelleCollection;
  }


  getAllParcelle(): Observable<EntityArrayResponseType> {
    return this.http.get<IParcelle[]>(`${this.resourceUrl}/get-all`, { observe: 'response' });
  }

  createParcelle(parcelleData: IParcelle, siteId: number) {
    return this.http.post<IIntrant>(`${this.resourceUrl}/create/${siteId}`, parcelleData, { observe: 'response' });
  }


}
