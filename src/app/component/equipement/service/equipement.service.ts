import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';


import { IEquipement, NewEquipement } from '../equipement.model';
import {ApplicationConfigService} from "../../../core/config/application-config.service";
import {createRequestOption} from "../../../core/request/request-util";
import {isPresent} from "../../../core/util/operators";
import {DATE_FORMAT} from "../../../config/input.constants";
import {ISite} from "../../site/site.model";
import {IStock} from "../../stock/stock.model";

export type PartialUpdateEquipement = Partial<IEquipement> & Pick<IEquipement, 'id'>;

type RestOf<T extends IEquipement | NewEquipement> = Omit<T, 'dateDerniereMaintenance'> & {
  dateDerniereMaintenance?: string | null;
};

export type RestEquipement = RestOf<IEquipement>;

export type NewRestEquipement = RestOf<NewEquipement>;

export type PartialUpdateRestEquipement = RestOf<PartialUpdateEquipement>;

export type EntityResponseType = HttpResponse<IEquipement>;
export type EntityArrayResponseType = HttpResponse<IEquipement[]>;

@Injectable({ providedIn: 'root' })
export class EquipementService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/equipements');

  // create(equipement: NewEquipement): Observable<EntityResponseType> {
  //   const copy = this.convertDateFromClient(equipement);
  //   return this.http
  //     .post<RestEquipement>(this.resourceUrl, copy, { observe: 'response' })
  //     .pipe(map(res => this.convertResponseFromServer(res)));
  // }

  // update(equipement: IEquipement): Observable<EntityResponseType> {
  //   const copy = this.convertDateFromClient(equipement);
  //   return this.http
  //     .put<RestEquipement>(`${this.resourceUrl}/${this.getEquipementIdentifier(equipement)}`, copy, { observe: 'response' })
  //     .pipe(map(res => this.convertResponseFromServer(res)));
  // }
  //
  // partialUpdate(equipement: PartialUpdateEquipement): Observable<EntityResponseType> {
  //   const copy = this.convertDateFromClient(equipement);
  //   return this.http
  //     .patch<RestEquipement>(`${this.resourceUrl}/${this.getEquipementIdentifier(equipement)}`, copy, { observe: 'response' })
  //     .pipe(map(res => this.convertResponseFromServer(res)));
  // }

  // find(id: number): Observable<EntityResponseType> {
  //   return this.http
  //     .get<RestEquipement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
  //     .pipe(map(res => this.convertResponseFromServer(res)));
  // }
  //
  // query(req?: any): Observable<EntityArrayResponseType> {
  //   const options = createRequestOption(req);
  //   return this.http
  //     .get<RestEquipement[]>(this.resourceUrl, { params: options, observe: 'response' })
  //     .pipe(map(res => this.convertResponseArrayFromServer(res)));
  // }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEquipementIdentifier(equipement: Pick<IEquipement, 'id'>): number {
    return equipement.id;
  }

  compareEquipement(o1: Pick<IEquipement, 'id'> | null, o2: Pick<IEquipement, 'id'> | null): boolean {
    return o1 && o2 ? this.getEquipementIdentifier(o1) === this.getEquipementIdentifier(o2) : o1 === o2;
  }

  addEquipementToCollectionIfMissing<Type extends Pick<IEquipement, 'id'>>(
    equipementCollection: Type[],
    ...equipementsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const equipements: Type[] = equipementsToCheck.filter(isPresent);
    if (equipements.length > 0) {
      const equipementCollectionIdentifiers = equipementCollection.map(equipementItem => this.getEquipementIdentifier(equipementItem));
      const equipementsToAdd = equipements.filter(equipementItem => {
        const equipementIdentifier = this.getEquipementIdentifier(equipementItem);
        if (equipementCollectionIdentifiers.includes(equipementIdentifier)) {
          return false;
        }
        equipementCollectionIdentifiers.push(equipementIdentifier);
        return true;
      });
      return [...equipementsToAdd, ...equipementCollection];
    }
    return equipementCollection;
  }

  // protected convertDateFromClient<T extends IEquipement | NewEquipement | PartialUpdateEquipement>(equipement: T): RestOf<T> {
  //   return {
  //     ...equipement,
  //     dateDerniereMaintenance: equipement.dateDerniereMaintenance?.format(DATE_FORMAT) ?? null,
  //   };
  // }

  // protected convertDateFromServer(restEquipement: RestEquipement): IEquipement {
  //   return {
  //     ...restEquipement,
  //     dateDerniereMaintenance: restEquipement.dateDerniereMaintenance ? dayjs(restEquipement.dateDerniereMaintenance) : undefined,
  //   };
  // }

  // protected convertResponseFromServer(res: HttpResponse<RestEquipement>): HttpResponse<IEquipement> {
  //   return res.clone({
  //     body: res.body ? this.convertDateFromServer(res.body) : null,
  //   });
  // }
  //
  // protected convertResponseArrayFromServer(res: HttpResponse<RestEquipement[]>): HttpResponse<IEquipement[]> {
  //   return res.clone({
  //     body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
  //   });
  // }


  getAllEquipements(): Observable<EntityArrayResponseType> {
    return this.http.get<IEquipement[]>(`${this.resourceUrl}/get-all`, { observe: 'response' });
  }

  createEquipement(stock: any, siteId: any): Observable<EntityResponseType> {
    return this.http.post<IStock>(`${this.resourceUrl}/create/${siteId}`, stock, { observe: 'response' });
  }


}
