import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IContentSession } from '../content-session.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../content-session.test-samples';

import { ContentSessionService } from './content-session.service';

const requireRestSample: IContentSession = {
  ...sampleWithRequiredData,
};

describe('ContentSession Service', () => {
  let service: ContentSessionService;
  let httpMock: HttpTestingController;
  let expectedResult: IContentSession | IContentSession[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ContentSessionService);
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

    it('should create a ContentSession', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const contentSession = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(contentSession).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ContentSession', () => {
      const contentSession = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(contentSession).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ContentSession', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ContentSession', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ContentSession', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addContentSessionToCollectionIfMissing', () => {
      it('should add a ContentSession to an empty array', () => {
        const contentSession: IContentSession = sampleWithRequiredData;
        expectedResult = service.addContentSessionToCollectionIfMissing([], contentSession);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contentSession);
      });

      it('should not add a ContentSession to an array that contains it', () => {
        const contentSession: IContentSession = sampleWithRequiredData;
        const contentSessionCollection: IContentSession[] = [
          {
            ...contentSession,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addContentSessionToCollectionIfMissing(contentSessionCollection, contentSession);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ContentSession to an array that doesn't contain it", () => {
        const contentSession: IContentSession = sampleWithRequiredData;
        const contentSessionCollection: IContentSession[] = [sampleWithPartialData];
        expectedResult = service.addContentSessionToCollectionIfMissing(contentSessionCollection, contentSession);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contentSession);
      });

      it('should add only unique ContentSession to an array', () => {
        const contentSessionArray: IContentSession[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const contentSessionCollection: IContentSession[] = [sampleWithRequiredData];
        expectedResult = service.addContentSessionToCollectionIfMissing(contentSessionCollection, ...contentSessionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const contentSession: IContentSession = sampleWithRequiredData;
        const contentSession2: IContentSession = sampleWithPartialData;
        expectedResult = service.addContentSessionToCollectionIfMissing([], contentSession, contentSession2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contentSession);
        expect(expectedResult).toContain(contentSession2);
      });

      it('should accept null and undefined values', () => {
        const contentSession: IContentSession = sampleWithRequiredData;
        expectedResult = service.addContentSessionToCollectionIfMissing([], null, contentSession, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contentSession);
      });

      it('should return initial array if no ContentSession is added', () => {
        const contentSessionCollection: IContentSession[] = [sampleWithRequiredData];
        expectedResult = service.addContentSessionToCollectionIfMissing(contentSessionCollection, undefined, null);
        expect(expectedResult).toEqual(contentSessionCollection);
      });
    });

    describe('compareContentSession', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareContentSession(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareContentSession(entity1, entity2);
        const compareResult2 = service.compareContentSession(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareContentSession(entity1, entity2);
        const compareResult2 = service.compareContentSession(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareContentSession(entity1, entity2);
        const compareResult2 = service.compareContentSession(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
