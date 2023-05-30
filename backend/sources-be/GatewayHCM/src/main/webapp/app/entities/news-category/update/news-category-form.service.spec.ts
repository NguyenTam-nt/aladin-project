import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../news-category.test-samples';

import { NewsCategoryFormService } from './news-category-form.service';

describe('NewsCategory Form Service', () => {
  let service: NewsCategoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsCategoryFormService);
  });

  describe('Service methods', () => {
    describe('createNewsCategoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createNewsCategoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            nameKo: expect.any(Object),
          })
        );
      });

      it('passing INewsCategory should create a new form with FormGroup', () => {
        const formGroup = service.createNewsCategoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            nameKo: expect.any(Object),
          })
        );
      });
    });

    describe('getNewsCategory', () => {
      it('should return NewNewsCategory for default NewsCategory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createNewsCategoryFormGroup(sampleWithNewData);

        const newsCategory = service.getNewsCategory(formGroup) as any;

        expect(newsCategory).toMatchObject(sampleWithNewData);
      });

      it('should return NewNewsCategory for empty NewsCategory initial value', () => {
        const formGroup = service.createNewsCategoryFormGroup();

        const newsCategory = service.getNewsCategory(formGroup) as any;

        expect(newsCategory).toMatchObject({});
      });

      it('should return INewsCategory', () => {
        const formGroup = service.createNewsCategoryFormGroup(sampleWithRequiredData);

        const newsCategory = service.getNewsCategory(formGroup) as any;

        expect(newsCategory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing INewsCategory should not enable id FormControl', () => {
        const formGroup = service.createNewsCategoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewNewsCategory should disable id FormControl', () => {
        const formGroup = service.createNewsCategoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
