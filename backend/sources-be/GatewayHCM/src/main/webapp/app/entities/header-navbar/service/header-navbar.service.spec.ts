import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IHeaderNavbar } from '../header-navbar.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../header-navbar.test-samples';

import { HeaderNavbarService } from './header-navbar.service';

const requireRestSample: IHeaderNavbar = {
  ...sampleWithRequiredData,
};

describe('HeaderNavbar Service', () => {
  let service: HeaderNavbarService;
  let httpMock: HttpTestingController;
  let expectedResult: IHeaderNavbar | IHeaderNavbar[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(HeaderNavbarService);
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

    it('should create a HeaderNavbar', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const headerNavbar = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(headerNavbar).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a HeaderNavbar', () => {
      const headerNavbar = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(headerNavbar).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a HeaderNavbar', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of HeaderNavbar', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a HeaderNavbar', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addHeaderNavbarToCollectionIfMissing', () => {
      it('should add a HeaderNavbar to an empty array', () => {
        const headerNavbar: IHeaderNavbar = sampleWithRequiredData;
        expectedResult = service.addHeaderNavbarToCollectionIfMissing([], headerNavbar);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(headerNavbar);
      });

      it('should not add a HeaderNavbar to an array that contains it', () => {
        const headerNavbar: IHeaderNavbar = sampleWithRequiredData;
        const headerNavbarCollection: IHeaderNavbar[] = [
          {
            ...headerNavbar,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addHeaderNavbarToCollectionIfMissing(headerNavbarCollection, headerNavbar);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a HeaderNavbar to an array that doesn't contain it", () => {
        const headerNavbar: IHeaderNavbar = sampleWithRequiredData;
        const headerNavbarCollection: IHeaderNavbar[] = [sampleWithPartialData];
        expectedResult = service.addHeaderNavbarToCollectionIfMissing(headerNavbarCollection, headerNavbar);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(headerNavbar);
      });

      it('should add only unique HeaderNavbar to an array', () => {
        const headerNavbarArray: IHeaderNavbar[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const headerNavbarCollection: IHeaderNavbar[] = [sampleWithRequiredData];
        expectedResult = service.addHeaderNavbarToCollectionIfMissing(headerNavbarCollection, ...headerNavbarArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const headerNavbar: IHeaderNavbar = sampleWithRequiredData;
        const headerNavbar2: IHeaderNavbar = sampleWithPartialData;
        expectedResult = service.addHeaderNavbarToCollectionIfMissing([], headerNavbar, headerNavbar2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(headerNavbar);
        expect(expectedResult).toContain(headerNavbar2);
      });

      it('should accept null and undefined values', () => {
        const headerNavbar: IHeaderNavbar = sampleWithRequiredData;
        expectedResult = service.addHeaderNavbarToCollectionIfMissing([], null, headerNavbar, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(headerNavbar);
      });

      it('should return initial array if no HeaderNavbar is added', () => {
        const headerNavbarCollection: IHeaderNavbar[] = [sampleWithRequiredData];
        expectedResult = service.addHeaderNavbarToCollectionIfMissing(headerNavbarCollection, undefined, null);
        expect(expectedResult).toEqual(headerNavbarCollection);
      });
    });

    describe('compareHeaderNavbar', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareHeaderNavbar(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareHeaderNavbar(entity1, entity2);
        const compareResult2 = service.compareHeaderNavbar(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareHeaderNavbar(entity1, entity2);
        const compareResult2 = service.compareHeaderNavbar(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareHeaderNavbar(entity1, entity2);
        const compareResult2 = service.compareHeaderNavbar(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
