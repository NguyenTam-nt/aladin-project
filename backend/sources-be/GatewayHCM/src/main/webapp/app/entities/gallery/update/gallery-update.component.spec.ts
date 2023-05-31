import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { GalleryFormService } from './gallery-form.service';
import { GalleryService } from '../service/gallery.service';
import { IGallery } from '../gallery.model';

import { GalleryUpdateComponent } from './gallery-update.component';

describe('Gallery Management Update Component', () => {
  let comp: GalleryUpdateComponent;
  let fixture: ComponentFixture<GalleryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let galleryFormService: GalleryFormService;
  let galleryService: GalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [GalleryUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(GalleryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GalleryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    galleryFormService = TestBed.inject(GalleryFormService);
    galleryService = TestBed.inject(GalleryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const gallery: IGallery = { id: 456 };

      activatedRoute.data = of({ gallery });
      comp.ngOnInit();

      expect(comp.gallery).toEqual(gallery);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGallery>>();
      const gallery = { id: 123 };
      jest.spyOn(galleryFormService, 'getGallery').mockReturnValue(gallery);
      jest.spyOn(galleryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ gallery });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: gallery }));
      saveSubject.complete();

      // THEN
      expect(galleryFormService.getGallery).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(galleryService.update).toHaveBeenCalledWith(expect.objectContaining(gallery));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGallery>>();
      const gallery = { id: 123 };
      jest.spyOn(galleryFormService, 'getGallery').mockReturnValue({ id: null });
      jest.spyOn(galleryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ gallery: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: gallery }));
      saveSubject.complete();

      // THEN
      expect(galleryFormService.getGallery).toHaveBeenCalled();
      expect(galleryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGallery>>();
      const gallery = { id: 123 };
      jest.spyOn(galleryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ gallery });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(galleryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
