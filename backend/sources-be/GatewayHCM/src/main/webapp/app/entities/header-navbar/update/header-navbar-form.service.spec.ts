import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../header-navbar.test-samples';

import { HeaderNavbarFormService } from './header-navbar-form.service';

describe('HeaderNavbar Form Service', () => {
  let service: HeaderNavbarFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderNavbarFormService);
  });

  describe('Service methods', () => {
    describe('createHeaderNavbarFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createHeaderNavbarFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            index: expect.any(Object),
            name: expect.any(Object),
            nameKo: expect.any(Object),
            link: expect.any(Object),
            parent: expect.any(Object),
          })
        );
      });

      it('passing IHeaderNavbar should create a new form with FormGroup', () => {
        const formGroup = service.createHeaderNavbarFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            index: expect.any(Object),
            name: expect.any(Object),
            nameKo: expect.any(Object),
            link: expect.any(Object),
            parent: expect.any(Object),
          })
        );
      });
    });

    describe('getHeaderNavbar', () => {
      it('should return NewHeaderNavbar for default HeaderNavbar initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createHeaderNavbarFormGroup(sampleWithNewData);

        const headerNavbar = service.getHeaderNavbar(formGroup) as any;

        expect(headerNavbar).toMatchObject(sampleWithNewData);
      });

      it('should return NewHeaderNavbar for empty HeaderNavbar initial value', () => {
        const formGroup = service.createHeaderNavbarFormGroup();

        const headerNavbar = service.getHeaderNavbar(formGroup) as any;

        expect(headerNavbar).toMatchObject({});
      });

      it('should return IHeaderNavbar', () => {
        const formGroup = service.createHeaderNavbarFormGroup(sampleWithRequiredData);

        const headerNavbar = service.getHeaderNavbar(formGroup) as any;

        expect(headerNavbar).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IHeaderNavbar should not enable id FormControl', () => {
        const formGroup = service.createHeaderNavbarFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewHeaderNavbar should disable id FormControl', () => {
        const formGroup = service.createHeaderNavbarFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
