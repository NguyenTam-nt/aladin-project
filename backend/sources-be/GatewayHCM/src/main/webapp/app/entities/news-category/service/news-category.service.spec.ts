import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INewsCategory } from '../news-category.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../news-category.test-samples';

import { NewsCategoryService } from './news-category.service';

const requireRestSample: INewsCategory = {
  ...sampleWithRequiredData,
};

describe('NewsCategory Service', () => {
  let service: NewsCategoryService;
  let httpMock: HttpTestingController;
  let expectedResult: INewsCategory | INewsCategory[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NewsCategoryService);
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

    it('should create a NewsCategory', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const newsCategory = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(newsCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a NewsCategory', () => {
      const newsCategory = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(newsCategory).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a NewsCategory', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of NewsCategory', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a NewsCategory', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addNewsCategoryToCollectionIfMissing', () => {
      it('should add a NewsCategory to an empty array', () => {
        const newsCategory: INewsCategory = sampleWithRequiredData;
        expectedResult = service.addNewsCategoryToCollectionIfMissing([], newsCategory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(newsCategory);
      });

      it('should not add a NewsCategory to an array that contains it', () => {
        const newsCategory: INewsCategory = sampleWithRequiredData;
        const newsCategoryCollection: INewsCategory[] = [
          {
            ...newsCategory,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addNewsCategoryToCollectionIfMissing(newsCategoryCollection, newsCategory);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a NewsCategory to an array that doesn't contain it", () => {
        const newsCategory: INewsCategory = sampleWithRequiredData;
        const newsCategoryCollection: INewsCategory[] = [sampleWithPartialData];
        expectedResult = service.addNewsCategoryToCollectionIfMissing(newsCategoryCollection, newsCategory);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(newsCategory);
      });

      it('should add only unique NewsCategory to an array', () => {
        const newsCategoryArray: INewsCategory[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const newsCategoryCollection: INewsCategory[] = [sampleWithRequiredData];
        expectedResult = service.addNewsCategoryToCollectionIfMissing(newsCategoryCollection, ...newsCategoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const newsCategory: INewsCategory = sampleWithRequiredData;
        const newsCategory2: INewsCategory = sampleWithPartialData;
        expectedResult = service.addNewsCategoryToCollectionIfMissing([], newsCategory, newsCategory2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(newsCategory);
        expect(expectedResult).toContain(newsCategory2);
      });

      it('should accept null and undefined values', () => {
        const newsCategory: INewsCategory = sampleWithRequiredData;
        expectedResult = service.addNewsCategoryToCollectionIfMissing([], null, newsCategory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(newsCategory);
      });

      it('should return initial array if no NewsCategory is added', () => {
        const newsCategoryCollection: INewsCategory[] = [sampleWithRequiredData];
        expectedResult = service.addNewsCategoryToCollectionIfMissing(newsCategoryCollection, undefined, null);
        expect(expectedResult).toEqual(newsCategoryCollection);
      });
    });

    describe('compareNewsCategory', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareNewsCategory(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareNewsCategory(entity1, entity2);
        const compareResult2 = service.compareNewsCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareNewsCategory(entity1, entity2);
        const compareResult2 = service.compareNewsCategory(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareNewsCategory(entity1, entity2);
        const compareResult2 = service.compareNewsCategory(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
