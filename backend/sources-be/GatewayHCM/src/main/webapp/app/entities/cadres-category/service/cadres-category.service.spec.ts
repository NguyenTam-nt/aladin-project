import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICadresCategory } from '../cadres-category.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../cadres-category.test-samples';

import { CadresCategoryService } from './cadres-category.service';

const requireRestSample: ICadresCategory = {
  ...sampleWithRequiredData,
};

describe('CadresCategory Service', () => {
  let service: CadresCategoryService;
  let httpMock: HttpTestingController;
  let expectedResult: ICadresCategory | ICadresCategory[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CadresCategoryService);
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

    it('should create a CadresCategory', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cadresCategory = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cadresCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CadresCategory', () => {
      const cadresCategory = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cadresCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CadresCategory', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CadresCategory', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CadresCategory', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCadresCategoryToCollectionIfMissing', () => {
      it('should add a CadresCategory to an empty array', () => {
        const cadresCategory: ICadresCategory = sampleWithRequiredData;
        expectedResult = service.addCadresCategoryToCollectionIfMissing([], cadresCategory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cadresCategory);
      });

      it('should not add a CadresCategory to an array that contains it', () => {
        const cadresCategory: ICadresCategory = sampleWithRequiredData;
        const cadresCategoryCollection: ICadresCategory[] = [
          {
            ...cadresCategory,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCadresCategoryToCollectionIfMissing(cadresCategoryCollection, cadresCategory);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CadresCategory to an array that doesn't contain it", () => {
        const cadresCategory: ICadresCategory = sampleWithRequiredData;
        const cadresCategoryCollection: ICadresCategory[] = [sampleWithPartialData];
        expectedResult = service.addCadresCategoryToCollectionIfMissing(cadresCategoryCollection, cadresCategory);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cadresCategory);
      });

      it('should add only unique CadresCategory to an array', () => {
        const cadresCategoryArray: ICadresCategory[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cadresCategoryCollection: ICadresCategory[] = [sampleWithRequiredData];
        expectedResult = service.addCadresCategoryToCollectionIfMissing(cadresCategoryCollection, ...cadresCategoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cadresCategory: ICadresCategory = sampleWithRequiredData;
        const cadresCategory2: ICadresCategory = sampleWithPartialData;
        expectedResult = service.addCadresCategoryToCollectionIfMissing([], cadresCategory, cadresCategory2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cadresCategory);
        expect(expectedResult).toContain(cadresCategory2);
      });

      it('should accept null and undefined values', () => {
        const cadresCategory: ICadresCategory = sampleWithRequiredData;
        expectedResult = service.addCadresCategoryToCollectionIfMissing([], null, cadresCategory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cadresCategory);
      });

      it('should return initial array if no CadresCategory is added', () => {
        const cadresCategoryCollection: ICadresCategory[] = [sampleWithRequiredData];
        expectedResult = service.addCadresCategoryToCollectionIfMissing(cadresCategoryCollection, undefined, null);
        expect(expectedResult).toEqual(cadresCategoryCollection);
      });
    });

    describe('compareCadresCategory', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCadresCategory(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCadresCategory(entity1, entity2);
        const compareResult2 = service.compareCadresCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCadresCategory(entity1, entity2);
        const compareResult2 = service.compareCadresCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCadresCategory(entity1, entity2);
        const compareResult2 = service.compareCadresCategory(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
