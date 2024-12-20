import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IFounisseur } from '../founisseur.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../founisseur.test-samples';

import { FounisseurService, RestFounisseur } from './founisseur.service';

const requireRestSample: RestFounisseur = {
  ...sampleWithRequiredData,
  dateCreation: sampleWithRequiredData.dateCreation?.format(DATE_FORMAT),
};

describe('Founisseur Service', () => {
  let service: FounisseurService;
  let httpMock: HttpTestingController;
  let expectedResult: IFounisseur | IFounisseur[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(FounisseurService);
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

    it('should create a Founisseur', () => {
      const founisseur = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(founisseur).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Founisseur', () => {
      const founisseur = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(founisseur).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Founisseur', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Founisseur', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Founisseur', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFounisseurToCollectionIfMissing', () => {
      it('should add a Founisseur to an empty array', () => {
        const founisseur: IFounisseur = sampleWithRequiredData;
        expectedResult = service.addFounisseurToCollectionIfMissing([], founisseur);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(founisseur);
      });

      it('should not add a Founisseur to an array that contains it', () => {
        const founisseur: IFounisseur = sampleWithRequiredData;
        const founisseurCollection: IFounisseur[] = [
          {
            ...founisseur,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFounisseurToCollectionIfMissing(founisseurCollection, founisseur);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Founisseur to an array that doesn't contain it", () => {
        const founisseur: IFounisseur = sampleWithRequiredData;
        const founisseurCollection: IFounisseur[] = [sampleWithPartialData];
        expectedResult = service.addFounisseurToCollectionIfMissing(founisseurCollection, founisseur);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(founisseur);
      });

      it('should add only unique Founisseur to an array', () => {
        const founisseurArray: IFounisseur[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const founisseurCollection: IFounisseur[] = [sampleWithRequiredData];
        expectedResult = service.addFounisseurToCollectionIfMissing(founisseurCollection, ...founisseurArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const founisseur: IFounisseur = sampleWithRequiredData;
        const founisseur2: IFounisseur = sampleWithPartialData;
        expectedResult = service.addFounisseurToCollectionIfMissing([], founisseur, founisseur2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(founisseur);
        expect(expectedResult).toContain(founisseur2);
      });

      it('should accept null and undefined values', () => {
        const founisseur: IFounisseur = sampleWithRequiredData;
        expectedResult = service.addFounisseurToCollectionIfMissing([], null, founisseur, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(founisseur);
      });

      it('should return initial array if no Founisseur is added', () => {
        const founisseurCollection: IFounisseur[] = [sampleWithRequiredData];
        expectedResult = service.addFounisseurToCollectionIfMissing(founisseurCollection, undefined, null);
        expect(expectedResult).toEqual(founisseurCollection);
      });
    });

    describe('compareFounisseur', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFounisseur(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFounisseur(entity1, entity2);
        const compareResult2 = service.compareFounisseur(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFounisseur(entity1, entity2);
        const compareResult2 = service.compareFounisseur(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFounisseur(entity1, entity2);
        const compareResult2 = service.compareFounisseur(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
