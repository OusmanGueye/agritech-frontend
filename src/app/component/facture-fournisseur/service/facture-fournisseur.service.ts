import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFactureFournisseur, NewFactureFournisseur } from '../facture-fournisseur.model';

export type PartialUpdateFactureFournisseur = Partial<IFactureFournisseur> & Pick<IFactureFournisseur, 'id'>;

type RestOf<T extends IFactureFournisseur | NewFactureFournisseur> = Omit<T, 'dateFacture' | 'datePaiement'> & {
  dateFacture?: string | null;
  datePaiement?: string | null;
};

export type RestFactureFournisseur = RestOf<IFactureFournisseur>;

export type NewRestFactureFournisseur = RestOf<NewFactureFournisseur>;

export type PartialUpdateRestFactureFournisseur = RestOf<PartialUpdateFactureFournisseur>;

export type EntityResponseType = HttpResponse<IFactureFournisseur>;
export type EntityArrayResponseType = HttpResponse<IFactureFournisseur[]>;

@Injectable({ providedIn: 'root' })
export class FactureFournisseurService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/facture-fournisseurs');

  create(factureFournisseur: NewFactureFournisseur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(factureFournisseur);
    return this.http
      .post<RestFactureFournisseur>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(factureFournisseur: IFactureFournisseur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(factureFournisseur);
    return this.http
      .put<RestFactureFournisseur>(`${this.resourceUrl}/${this.getFactureFournisseurIdentifier(factureFournisseur)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(factureFournisseur: PartialUpdateFactureFournisseur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(factureFournisseur);
    return this.http
      .patch<RestFactureFournisseur>(`${this.resourceUrl}/${this.getFactureFournisseurIdentifier(factureFournisseur)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestFactureFournisseur>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestFactureFournisseur[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFactureFournisseurIdentifier(factureFournisseur: Pick<IFactureFournisseur, 'id'>): number {
    return factureFournisseur.id;
  }

  compareFactureFournisseur(o1: Pick<IFactureFournisseur, 'id'> | null, o2: Pick<IFactureFournisseur, 'id'> | null): boolean {
    return o1 && o2 ? this.getFactureFournisseurIdentifier(o1) === this.getFactureFournisseurIdentifier(o2) : o1 === o2;
  }

  addFactureFournisseurToCollectionIfMissing<Type extends Pick<IFactureFournisseur, 'id'>>(
    factureFournisseurCollection: Type[],
    ...factureFournisseursToCheck: (Type | null | undefined)[]
  ): Type[] {
    const factureFournisseurs: Type[] = factureFournisseursToCheck.filter(isPresent);
    if (factureFournisseurs.length > 0) {
      const factureFournisseurCollectionIdentifiers = factureFournisseurCollection.map(factureFournisseurItem =>
        this.getFactureFournisseurIdentifier(factureFournisseurItem),
      );
      const factureFournisseursToAdd = factureFournisseurs.filter(factureFournisseurItem => {
        const factureFournisseurIdentifier = this.getFactureFournisseurIdentifier(factureFournisseurItem);
        if (factureFournisseurCollectionIdentifiers.includes(factureFournisseurIdentifier)) {
          return false;
        }
        factureFournisseurCollectionIdentifiers.push(factureFournisseurIdentifier);
        return true;
      });
      return [...factureFournisseursToAdd, ...factureFournisseurCollection];
    }
    return factureFournisseurCollection;
  }

  protected convertDateFromClient<T extends IFactureFournisseur | NewFactureFournisseur | PartialUpdateFactureFournisseur>(
    factureFournisseur: T,
  ): RestOf<T> {
    return {
      ...factureFournisseur,
      dateFacture: factureFournisseur.dateFacture?.format(DATE_FORMAT) ?? null,
      datePaiement: factureFournisseur.datePaiement?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restFactureFournisseur: RestFactureFournisseur): IFactureFournisseur {
    return {
      ...restFactureFournisseur,
      dateFacture: restFactureFournisseur.dateFacture ? dayjs(restFactureFournisseur.dateFacture) : undefined,
      datePaiement: restFactureFournisseur.datePaiement ? dayjs(restFactureFournisseur.datePaiement) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestFactureFournisseur>): HttpResponse<IFactureFournisseur> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestFactureFournisseur[]>): HttpResponse<IFactureFournisseur[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
