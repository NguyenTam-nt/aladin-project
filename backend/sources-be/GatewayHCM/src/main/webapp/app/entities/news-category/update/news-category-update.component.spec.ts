import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { NewsCategoryFormService } from './news-category-form.service';
import { NewsCategoryService } from '../service/news-category.service';
import { INewsCategory } from '../news-category.model';

import { NewsCategoryUpdateComponent } from './news-category-update.component';

describe('NewsCategory Management Update Component', () => {
  let comp: NewsCategoryUpdateComponent;
  let fixture: ComponentFixture<NewsCategoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let newsCategoryFormService: NewsCategoryFormService;
  let newsCategoryService: NewsCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [NewsCategoryUpdateComponent],
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
      .overrideTemplate(NewsCategoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NewsCategoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    newsCategoryFormService = TestBed.inject(NewsCategoryFormService);
    newsCategoryService = TestBed.inject(NewsCategoryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const newsCategory: INewsCategory = { id: 456 };

      activatedRoute.data = of({ newsCategory });
      comp.ngOnInit();

      expect(comp.newsCategory).toEqual(newsCategory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INewsCategory>>();
      const newsCategory = { id: 123 };
      jest.spyOn(newsCategoryFormService, 'getNewsCategory').mockReturnValue(newsCategory);
      jest.spyOn(newsCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ newsCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: newsCategory }));
      saveSubject.complete();

      // THEN
      expect(newsCategoryFormService.getNewsCategory).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(newsCategoryService.update).toHaveBeenCalledWith(expect.objectContaining(newsCategory));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INewsCategory>>();
      const newsCategory = { id: 123 };
      jest.spyOn(newsCategoryFormService, 'getNewsCategory').mockReturnValue({ id: null });
      jest.spyOn(newsCategoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ newsCategory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: newsCategory }));
      saveSubject.complete();

      // THEN
      expect(newsCategoryFormService.getNewsCategory).toHaveBeenCalled();
      expect(newsCategoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INewsCategory>>();
      const newsCategory = { id: 123 };
      jest.spyOn(newsCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ newsCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(newsCategoryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
