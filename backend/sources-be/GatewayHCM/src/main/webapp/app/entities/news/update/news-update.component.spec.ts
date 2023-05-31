import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { NewsFormService } from './news-form.service';
import { NewsService } from '../service/news.service';
import { INews } from '../news.model';
import { INewsCategory } from 'app/entities/news-category/news-category.model';
import { NewsCategoryService } from 'app/entities/news-category/service/news-category.service';

import { NewsUpdateComponent } from './news-update.component';

describe('News Management Update Component', () => {
  let comp: NewsUpdateComponent;
  let fixture: ComponentFixture<NewsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let newsFormService: NewsFormService;
  let newsService: NewsService;
  let newsCategoryService: NewsCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [NewsUpdateComponent],
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
      .overrideTemplate(NewsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NewsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    newsFormService = TestBed.inject(NewsFormService);
    newsService = TestBed.inject(NewsService);
    newsCategoryService = TestBed.inject(NewsCategoryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call NewsCategory query and add missing value', () => {
      const news: INews = { id: 456 };
      const newsCategory: INewsCategory = { id: 46091 };
      news.newsCategory = newsCategory;

      const newsCategoryCollection: INewsCategory[] = [{ id: 70347 }];
      jest.spyOn(newsCategoryService, 'query').mockReturnValue(of(new HttpResponse({ body: newsCategoryCollection })));
      const additionalNewsCategories = [newsCategory];
      const expectedCollection: INewsCategory[] = [...additionalNewsCategories, ...newsCategoryCollection];
      jest.spyOn(newsCategoryService, 'addNewsCategoryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ news });
      comp.ngOnInit();

      expect(newsCategoryService.query).toHaveBeenCalled();
      expect(newsCategoryService.addNewsCategoryToCollectionIfMissing).toHaveBeenCalledWith(
        newsCategoryCollection,
        ...additionalNewsCategories.map(expect.objectContaining)
      );
      expect(comp.newsCategoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const news: INews = { id: 456 };
      const newsCategory: INewsCategory = { id: 48996 };
      news.newsCategory = newsCategory;

      activatedRoute.data = of({ news });
      comp.ngOnInit();

      expect(comp.newsCategoriesSharedCollection).toContain(newsCategory);
      expect(comp.news).toEqual(news);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INews>>();
      const news = { id: 123 };
      jest.spyOn(newsFormService, 'getNews').mockReturnValue(news);
      jest.spyOn(newsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ news });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: news }));
      saveSubject.complete();

      // THEN
      expect(newsFormService.getNews).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(newsService.update).toHaveBeenCalledWith(expect.objectContaining(news));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INews>>();
      const news = { id: 123 };
      jest.spyOn(newsFormService, 'getNews').mockReturnValue({ id: null });
      jest.spyOn(newsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ news: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: news }));
      saveSubject.complete();

      // THEN
      expect(newsFormService.getNews).toHaveBeenCalled();
      expect(newsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INews>>();
      const news = { id: 123 };
      jest.spyOn(newsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ news });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(newsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareNewsCategory', () => {
      it('Should forward to newsCategoryService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(newsCategoryService, 'compareNewsCategory');
        comp.compareNewsCategory(entity, entity2);
        expect(newsCategoryService.compareNewsCategory).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
