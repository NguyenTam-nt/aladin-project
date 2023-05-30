import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CadresFormService } from './cadres-form.service';
import { CadresService } from '../service/cadres.service';
import { ICadres } from '../cadres.model';

import { CadresUpdateComponent } from './cadres-update.component';

describe('Cadres Management Update Component', () => {
  let comp: CadresUpdateComponent;
  let fixture: ComponentFixture<CadresUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cadresFormService: CadresFormService;
  let cadresService: CadresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CadresUpdateComponent],
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
      .overrideTemplate(CadresUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CadresUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cadresFormService = TestBed.inject(CadresFormService);
    cadresService = TestBed.inject(CadresService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cadres: ICadres = { id: 456 };

      activatedRoute.data = of({ cadres });
      comp.ngOnInit();

      expect(comp.cadres).toEqual(cadres);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICadres>>();
      const cadres = { id: 123 };
      jest.spyOn(cadresFormService, 'getCadres').mockReturnValue(cadres);
      jest.spyOn(cadresService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cadres });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cadres }));
      saveSubject.complete();

      // THEN
      expect(cadresFormService.getCadres).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cadresService.update).toHaveBeenCalledWith(expect.objectContaining(cadres));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICadres>>();
      const cadres = { id: 123 };
      jest.spyOn(cadresFormService, 'getCadres').mockReturnValue({ id: null });
      jest.spyOn(cadresService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cadres: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cadres }));
      saveSubject.complete();

      // THEN
      expect(cadresFormService.getCadres).toHaveBeenCalled();
      expect(cadresService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICadres>>();
      const cadres = { id: 123 };
      jest.spyOn(cadresService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cadres });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cadresService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
