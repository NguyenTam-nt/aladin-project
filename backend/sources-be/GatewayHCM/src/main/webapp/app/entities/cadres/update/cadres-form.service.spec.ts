import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cadres.test-samples';

import { CadresFormService } from './cadres-form.service';

describe('Cadres Form Service', () => {
  let service: CadresFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadresFormService);
  });

  describe('Service methods', () => {
    describe('createCadresFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCadresFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fullname: expect.any(Object),
            fullnameKo: expect.any(Object),
            position: expect.any(Object),
            positionKo: expect.any(Object),
            email: expect.any(Object),
            major: expect.any(Object),
            majorKo: expect.any(Object),
            workResponsibility: expect.any(Object),
            workResponsibilityKo: expect.any(Object),
            title: expect.any(Object),
            titleKo: expect.any(Object),
            content: expect.any(Object),
            contentKo: expect.any(Object),
          })
        );
      });

      it('passing ICadres should create a new form with FormGroup', () => {
        const formGroup = service.createCadresFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fullname: expect.any(Object),
            fullnameKo: expect.any(Object),
            position: expect.any(Object),
            positionKo: expect.any(Object),
            email: expect.any(Object),
            major: expect.any(Object),
            majorKo: expect.any(Object),
            workResponsibility: expect.any(Object),
            workResponsibilityKo: expect.any(Object),
            title: expect.any(Object),
            titleKo: expect.any(Object),
            content: expect.any(Object),
            contentKo: expect.any(Object),
          })
        );
      });
    });

    describe('getCadres', () => {
      it('should return NewCadres for default Cadres initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCadresFormGroup(sampleWithNewData);

        const cadres = service.getCadres(formGroup) as any;

        expect(cadres).toMatchObject(sampleWithNewData);
      });

      it('should return NewCadres for empty Cadres initial value', () => {
        const formGroup = service.createCadresFormGroup();

        const cadres = service.getCadres(formGroup) as any;

        expect(cadres).toMatchObject({});
      });

      it('should return ICadres', () => {
        const formGroup = service.createCadresFormGroup(sampleWithRequiredData);

        const cadres = service.getCadres(formGroup) as any;

        expect(cadres).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICadres should not enable id FormControl', () => {
        const formGroup = service.createCadresFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCadres should disable id FormControl', () => {
        const formGroup = service.createCadresFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
