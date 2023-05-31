import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cadres-category.test-samples';

import { CadresCategoryFormService } from './cadres-category-form.service';

describe('CadresCategory Form Service', () => {
  let service: CadresCategoryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadresCategoryFormService);
  });

  describe('Service methods', () => {
    describe('createCadresCategoryFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCadresCategoryFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            nameKo: expect.any(Object),
            cadres: expect.any(Object),
          })
        );
      });

      it('passing ICadresCategory should create a new form with FormGroup', () => {
        const formGroup = service.createCadresCategoryFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            nameKo: expect.any(Object),
            cadres: expect.any(Object),
          })
        );
      });
    });

    describe('getCadresCategory', () => {
      it('should return NewCadresCategory for default CadresCategory initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCadresCategoryFormGroup(sampleWithNewData);

        const cadresCategory = service.getCadresCategory(formGroup) as any;

        expect(cadresCategory).toMatchObject(sampleWithNewData);
      });

      it('should return NewCadresCategory for empty CadresCategory initial value', () => {
        const formGroup = service.createCadresCategoryFormGroup();

        const cadresCategory = service.getCadresCategory(formGroup) as any;

        expect(cadresCategory).toMatchObject({});
      });

      it('should return ICadresCategory', () => {
        const formGroup = service.createCadresCategoryFormGroup(sampleWithRequiredData);

        const cadresCategory = service.getCadresCategory(formGroup) as any;

        expect(cadresCategory).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICadresCategory should not enable id FormControl', () => {
        const formGroup = service.createCadresCategoryFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCadresCategory should disable id FormControl', () => {
        const formGroup = service.createCadresCategoryFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
