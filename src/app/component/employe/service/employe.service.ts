import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmploye, NewEmploye } from '../employe.model';

export type PartialUpdateEmploye = Partial<IEmploye> & Pick<IEmploye, 'id'>;

type RestOf<T extends IEmploye | NewEmploye> = Omit<T, 'dateCreation'> & {
  dateCreation?: string | null;
};

export type RestEmploye = RestOf<IEmploye>;

export type NewRestEmploye = RestOf<NewEmploye>;

export type PartialUpdateRestEmploye = RestOf<PartialUpdateEmploye>;

export type EntityResponseType = HttpResponse<IEmploye>;
export type EntityArrayResponseType = HttpResponse<IEmploye[]>;

@Injectable({ providedIn: 'root' })
export class EmployeService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/employes');

  create(employe: NewEmploye): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employe);
    return this.http
      .post<RestEmploye>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(employe: IEmploye): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employe);
    return this.http
      .put<RestEmploye>(`${this.resourceUrl}/${this.getEmployeIdentifier(employe)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(employe: PartialUpdateEmploye): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employe);
    return this.http
      .patch<RestEmploye>(`${this.resourceUrl}/${this.getEmployeIdentifier(employe)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestEmploye>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestEmploye[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEmployeIdentifier(employe: Pick<IEmploye, 'id'>): number {
    return employe.id;
  }

  compareEmploye(o1: Pick<IEmploye, 'id'> | null, o2: Pick<IEmploye, 'id'> | null): boolean {
    return o1 && o2 ? this.getEmployeIdentifier(o1) === this.getEmployeIdentifier(o2) : o1 === o2;
  }

  addEmployeToCollectionIfMissing<Type extends Pick<IEmploye, 'id'>>(
    employeCollection: Type[],
    ...employesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const employes: Type[] = employesToCheck.filter(isPresent);
    if (employes.length > 0) {
      const employeCollectionIdentifiers = employeCollection.map(employeItem => this.getEmployeIdentifier(employeItem));
      const employesToAdd = employes.filter(employeItem => {
        const employeIdentifier = this.getEmployeIdentifier(employeItem);
        if (employeCollectionIdentifiers.includes(employeIdentifier)) {
          return false;
        }
        employeCollectionIdentifiers.push(employeIdentifier);
        return true;
      });
      return [...employesToAdd, ...employeCollection];
    }
    return employeCollection;
  }

  protected convertDateFromClient<T extends IEmploye | NewEmploye | PartialUpdateEmploye>(employe: T): RestOf<T> {
    return {
      ...employe,
      dateCreation: employe.dateCreation?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restEmploye: RestEmploye): IEmploye {
    return {
      ...restEmploye,
      dateCreation: restEmploye.dateCreation ? dayjs(restEmploye.dateCreation) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestEmploye>): HttpResponse<IEmploye> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestEmploye[]>): HttpResponse<IEmploye[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
