import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../content-session.test-samples';

import { ContentSessionFormService } from './content-session-form.service';

describe('ContentSession Form Service', () => {
  let service: ContentSessionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentSessionFormService);
  });

  describe('Service methods', () => {
    describe('createContentSessionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createContentSessionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            type: expect.any(Object),
            category: expect.any(Object),
            categoryKo: expect.any(Object),
            tilte: expect.any(Object),
            tilteKo: expect.any(Object),
            content: expect.any(Object),
            contentKo: expect.any(Object),
          })
        );
      });

      it('passing IContentSession should create a new form with FormGroup', () => {
        const formGroup = service.createContentSessionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            type: expect.any(Object),
            category: expect.any(Object),
            categoryKo: expect.any(Object),
            tilte: expect.any(Object),
            tilteKo: expect.any(Object),
            content: expect.any(Object),
            contentKo: expect.any(Object),
          })
        );
      });
    });

    describe('getContentSession', () => {
      it('should return NewContentSession for default ContentSession initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createContentSessionFormGroup(sampleWithNewData);

        const contentSession = service.getContentSession(formGroup) as any;

        expect(contentSession).toMatchObject(sampleWithNewData);
      });

      it('should return NewContentSession for empty ContentSession initial value', () => {
        const formGroup = service.createContentSessionFormGroup();

        const contentSession = service.getContentSession(formGroup) as any;

        expect(contentSession).toMatchObject({});
      });

      it('should return IContentSession', () => {
        const formGroup = service.createContentSessionFormGroup(sampleWithRequiredData);

        const contentSession = service.getContentSession(formGroup) as any;

        expect(contentSession).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IContentSession should not enable id FormControl', () => {
        const formGroup = service.createContentSessionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewContentSession should disable id FormControl', () => {
        const formGroup = service.createContentSessionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
