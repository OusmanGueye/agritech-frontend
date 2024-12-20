import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IFactureFournisseur } from '../facture-fournisseur.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../facture-fournisseur.test-samples';

import { FactureFournisseurService, RestFactureFournisseur } from './facture-fournisseur.service';

const requireRestSample: RestFactureFournisseur = {
  ...sampleWithRequiredData,
  dateFacture: sampleWithRequiredData.dateFacture?.format(DATE_FORMAT),
  datePaiement: sampleWithRequiredData.datePaiement?.format(DATE_FORMAT),
};

describe('FactureFournisseur Service', () => {
  let service: FactureFournisseurService;
  let httpMock: HttpTestingController;
  let expectedResult: IFactureFournisseur | IFactureFournisseur[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(FactureFournisseurService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a FactureFournisseur', () => {
      const factureFournisseur = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(factureFournisseur).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FactureFournisseur', () => {
      const factureFournisseur = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(factureFournisseur).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FactureFournisseur', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FactureFournisseur', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FactureFournisseur', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFactureFournisseurToCollectionIfMissing', () => {
      it('should add a FactureFournisseur to an empty array', () => {
        const factureFournisseur: IFactureFournisseur = sampleWithRequiredData;
        expectedResult = service.addFactureFournisseurToCollectionIfMissing([], factureFournisseur);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(factureFournisseur);
      });

      it('should not add a FactureFournisseur to an array that contains it', () => {
        const factureFournisseur: IFactureFournisseur = sampleWithRequiredData;
        const factureFournisseurCollection: IFactureFournisseur[] = [
          {
            ...factureFournisseur,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFactureFournisseurToCollectionIfMissing(factureFournisseurCollection, factureFournisseur);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FactureFournisseur to an array that doesn't contain it", () => {
        const factureFournisseur: IFactureFournisseur = sampleWithRequiredData;
        const factureFournisseurCollection: IFactureFournisseur[] = [sampleWithPartialData];
        expectedResult = service.addFactureFournisseurToCollectionIfMissing(factureFournisseurCollection, factureFournisseur);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(factureFournisseur);
      });

      it('should add only unique FactureFournisseur to an array', () => {
        const factureFournisseurArray: IFactureFournisseur[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const factureFournisseurCollection: IFactureFournisseur[] = [sampleWithRequiredData];
        expectedResult = service.addFactureFournisseurToCollectionIfMissing(factureFournisseurCollection, ...factureFournisseurArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const factureFournisseur: IFactureFournisseur = sampleWithRequiredData;
        const factureFournisseur2: IFactureFournisseur = sampleWithPartialData;
        expectedResult = service.addFactureFournisseurToCollectionIfMissing([], factureFournisseur, factureFournisseur2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(factureFournisseur);
        expect(expectedResult).toContain(factureFournisseur2);
      });

      it('should accept null and undefined values', () => {
        const factureFournisseur: IFactureFournisseur = sampleWithRequiredData;
        expectedResult = service.addFactureFournisseurToCollectionIfMissing([], null, factureFournisseur, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(factureFournisseur);
      });

      it('should return initial array if no FactureFournisseur is added', () => {
        const factureFournisseurCollection: IFactureFournisseur[] = [sampleWithRequiredData];
        expectedResult = service.addFactureFournisseurToCollectionIfMissing(factureFournisseurCollection, undefined, null);
        expect(expectedResult).toEqual(factureFournisseurCollection);
      });
    });

    describe('compareFactureFournisseur', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFactureFournisseur(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFactureFournisseur(entity1, entity2);
        const compareResult2 = service.compareFactureFournisseur(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFactureFournisseur(entity1, entity2);
        const compareResult2 = service.compareFactureFournisseur(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFactureFournisseur(entity1, entity2);
        const compareResult2 = service.compareFactureFournisseur(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
