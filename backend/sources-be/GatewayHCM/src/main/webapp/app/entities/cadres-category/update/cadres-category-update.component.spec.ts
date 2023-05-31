import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CadresCategoryFormService } from './cadres-category-form.service';
import { CadresCategoryService } from '../service/cadres-category.service';
import { ICadresCategory } from '../cadres-category.model';
import { ICadres } from 'app/entities/cadres/cadres.model';
import { CadresService } from 'app/entities/cadres/service/cadres.service';

import { CadresCategoryUpdateComponent } from './cadres-category-update.component';

describe('CadresCategory Management Update Component', () => {
  let comp: CadresCategoryUpdateComponent;
  let fixture: ComponentFixture<CadresCategoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cadresCategoryFormService: CadresCategoryFormService;
  let cadresCategoryService: CadresCategoryService;
  let cadresService: CadresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CadresCategoryUpdateComponent],
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
      .overrideTemplate(CadresCategoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CadresCategoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cadresCategoryFormService = TestBed.inject(CadresCategoryFormService);
    cadresCategoryService = TestBed.inject(CadresCategoryService);
    cadresService = TestBed.inject(CadresService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Cadres query and add missing value', () => {
      const cadresCategory: ICadresCategory = { id: 456 };
      const cadres: ICadres = { id: 49369 };
      cadresCategory.cadres = cadres;

      const cadresCollection: ICadres[] = [{ id: 75435 }];
      jest.spyOn(cadresService, 'query').mockReturnValue(of(new HttpResponse({ body: cadresCollection })));
      const additionalCadres = [cadres];
      const expectedCollection: ICadres[] = [...additionalCadres, ...cadresCollection];
      jest.spyOn(cadresService, 'addCadresToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cadresCategory });
      comp.ngOnInit();

      expect(cadresService.query).toHaveBeenCalled();
      expect(cadresService.addCadresToCollectionIfMissing).toHaveBeenCalledWith(
        cadresCollection,
        ...additionalCadres.map(expect.objectContaining)
      );
      expect(comp.cadresSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const cadresCategory: ICadresCategory = { id: 456 };
      const cadres: ICadres = { id: 20949 };
      cadresCategory.cadres = cadres;

      activatedRoute.data = of({ cadresCategory });
      comp.ngOnInit();

      expect(comp.cadresSharedCollection).toContain(cadres);
      expect(comp.cadresCategory).toEqual(cadresCategory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICadresCategory>>();
      const cadresCategory = { id: 123 };
      jest.spyOn(cadresCategoryFormService, 'getCadresCategory').mockReturnValue(cadresCategory);
      jest.spyOn(cadresCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cadresCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cadresCategory }));
      saveSubject.complete();

      // THEN
      expect(cadresCategoryFormService.getCadresCategory).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cadresCategoryService.update).toHaveBeenCalledWith(expect.objectContaining(cadresCategory));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICadresCategory>>();
      const cadresCategory = { id: 123 };
      jest.spyOn(cadresCategoryFormService, 'getCadresCategory').mockReturnValue({ id: null });
      jest.spyOn(cadresCategoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cadresCategory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cadresCategory }));
      saveSubject.complete();

      // THEN
      expect(cadresCategoryFormService.getCadresCategory).toHaveBeenCalled();
      expect(cadresCategoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICadresCategory>>();
      const cadresCategory = { id: 123 };
      jest.spyOn(cadresCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cadresCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cadresCategoryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCadres', () => {
      it('Should forward to cadresService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(cadresService, 'compareCadres');
        comp.compareCadres(entity, entity2);
        expect(cadresService.compareCadres).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
