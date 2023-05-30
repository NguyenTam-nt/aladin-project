import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IGallery } from '../gallery.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../gallery.test-samples';

import { GalleryService } from './gallery.service';

const requireRestSample: IGallery = {
  ...sampleWithRequiredData,
};

describe('Gallery Service', () => {
  let service: GalleryService;
  let httpMock: HttpTestingController;
  let expectedResult: IGallery | IGallery[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GalleryService);
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

    it('should create a Gallery', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const gallery = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(gallery).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Gallery', () => {
      const gallery = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(gallery).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Gallery', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Gallery', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Gallery', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addGalleryToCollectionIfMissing', () => {
      it('should add a Gallery to an empty array', () => {
        const gallery: IGallery = sampleWithRequiredData;
        expectedResult = service.addGalleryToCollectionIfMissing([], gallery);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(gallery);
      });

      it('should not add a Gallery to an array that contains it', () => {
        const gallery: IGallery = sampleWithRequiredData;
        const galleryCollection: IGallery[] = [
          {
            ...gallery,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addGalleryToCollectionIfMissing(galleryCollection, gallery);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Gallery to an array that doesn't contain it", () => {
        const gallery: IGallery = sampleWithRequiredData;
        const galleryCollection: IGallery[] = [sampleWithPartialData];
        expectedResult = service.addGalleryToCollectionIfMissing(galleryCollection, gallery);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(gallery);
      });

      it('should add only unique Gallery to an array', () => {
        const galleryArray: IGallery[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const galleryCollection: IGallery[] = [sampleWithRequiredData];
        expectedResult = service.addGalleryToCollectionIfMissing(galleryCollection, ...galleryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const gallery: IGallery = sampleWithRequiredData;
        const gallery2: IGallery = sampleWithPartialData;
        expectedResult = service.addGalleryToCollectionIfMissing([], gallery, gallery2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(gallery);
        expect(expectedResult).toContain(gallery2);
      });

      it('should accept null and undefined values', () => {
        const gallery: IGallery = sampleWithRequiredData;
        expectedResult = service.addGalleryToCollectionIfMissing([], null, gallery, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(gallery);
      });

      it('should return initial array if no Gallery is added', () => {
        const galleryCollection: IGallery[] = [sampleWithRequiredData];
        expectedResult = service.addGalleryToCollectionIfMissing(galleryCollection, undefined, null);
        expect(expectedResult).toEqual(galleryCollection);
      });
    });

    describe('compareGallery', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareGallery(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareGallery(entity1, entity2);
        const compareResult2 = service.compareGallery(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareGallery(entity1, entity2);
        const compareResult2 = service.compareGallery(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareGallery(entity1, entity2);
        const compareResult2 = service.compareGallery(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
