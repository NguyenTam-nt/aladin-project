import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FilesFormService } from './files-form.service';
import { FilesService } from '../service/files.service';
import { IFiles } from '../files.model';
import { IContentSession } from 'app/entities/content-session/content-session.model';
import { ContentSessionService } from 'app/entities/content-session/service/content-session.service';
import { INews } from 'app/entities/news/news.model';
import { NewsService } from 'app/entities/news/service/news.service';
import { ICadres } from 'app/entities/cadres/cadres.model';
import { CadresService } from 'app/entities/cadres/service/cadres.service';
import { ISubject } from 'app/entities/subject/subject.model';
import { SubjectService } from 'app/entities/subject/service/subject.service';
import { IGallery } from 'app/entities/gallery/gallery.model';
import { GalleryService } from 'app/entities/gallery/service/gallery.service';

import { FilesUpdateComponent } from './files-update.component';

describe('Files Management Update Component', () => {
  let comp: FilesUpdateComponent;
  let fixture: ComponentFixture<FilesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let filesFormService: FilesFormService;
  let filesService: FilesService;
  let contentSessionService: ContentSessionService;
  let newsService: NewsService;
  let cadresService: CadresService;
  let subjectService: SubjectService;
  let galleryService: GalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FilesUpdateComponent],
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
      .overrideTemplate(FilesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FilesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    filesFormService = TestBed.inject(FilesFormService);
    filesService = TestBed.inject(FilesService);
    contentSessionService = TestBed.inject(ContentSessionService);
    newsService = TestBed.inject(NewsService);
    cadresService = TestBed.inject(CadresService);
    subjectService = TestBed.inject(SubjectService);
    galleryService = TestBed.inject(GalleryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ContentSession query and add missing value', () => {
      const files: IFiles = { id: 456 };
      const contentSession: IContentSession = { id: 71313 };
      files.contentSession = contentSession;

      const contentSessionCollection: IContentSession[] = [{ id: 49737 }];
      jest.spyOn(contentSessionService, 'query').mockReturnValue(of(new HttpResponse({ body: contentSessionCollection })));
      const additionalContentSessions = [contentSession];
      const expectedCollection: IContentSession[] = [...additionalContentSessions, ...contentSessionCollection];
      jest.spyOn(contentSessionService, 'addContentSessionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ files });
      comp.ngOnInit();

      expect(contentSessionService.query).toHaveBeenCalled();
      expect(contentSessionService.addContentSessionToCollectionIfMissing).toHaveBeenCalledWith(
        contentSessionCollection,
        ...additionalContentSessions.map(expect.objectContaining)
      );
      expect(comp.contentSessionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call News query and add missing value', () => {
      const files: IFiles = { id: 456 };
      const news: INews = { id: 42112 };
      files.news = news;

      const newsCollection: INews[] = [{ id: 34428 }];
      jest.spyOn(newsService, 'query').mockReturnValue(of(new HttpResponse({ body: newsCollection })));
      const additionalNews = [news];
      const expectedCollection: INews[] = [...additionalNews, ...newsCollection];
      jest.spyOn(newsService, 'addNewsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ files });
      comp.ngOnInit();

      expect(newsService.query).toHaveBeenCalled();
      expect(newsService.addNewsToCollectionIfMissing).toHaveBeenCalledWith(newsCollection, ...additionalNews.map(expect.objectContaining));
      expect(comp.newsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Cadres query and add missing value', () => {
      const files: IFiles = { id: 456 };
      const cadres: ICadres = { id: 76931 };
      files.cadres = cadres;

      const cadresCollection: ICadres[] = [{ id: 8358 }];
      jest.spyOn(cadresService, 'query').mockReturnValue(of(new HttpResponse({ body: cadresCollection })));
      const additionalCadres = [cadres];
      const expectedCollection: ICadres[] = [...additionalCadres, ...cadresCollection];
      jest.spyOn(cadresService, 'addCadresToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ files });
      comp.ngOnInit();

      expect(cadresService.query).toHaveBeenCalled();
      expect(cadresService.addCadresToCollectionIfMissing).toHaveBeenCalledWith(
        cadresCollection,
        ...additionalCadres.map(expect.objectContaining)
      );
      expect(comp.cadresSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Subject query and add missing value', () => {
      const files: IFiles = { id: 456 };
      const subject: ISubject = { id: 69633 };
      files.subject = subject;

      const subjectCollection: ISubject[] = [{ id: 34712 }];
      jest.spyOn(subjectService, 'query').mockReturnValue(of(new HttpResponse({ body: subjectCollection })));
      const additionalSubjects = [subject];
      const expectedCollection: ISubject[] = [...additionalSubjects, ...subjectCollection];
      jest.spyOn(subjectService, 'addSubjectToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ files });
      comp.ngOnInit();

      expect(subjectService.query).toHaveBeenCalled();
      expect(subjectService.addSubjectToCollectionIfMissing).toHaveBeenCalledWith(
        subjectCollection,
        ...additionalSubjects.map(expect.objectContaining)
      );
      expect(comp.subjectsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Gallery query and add missing value', () => {
      const files: IFiles = { id: 456 };
      const gallery: IGallery = { id: 28911 };
      files.gallery = gallery;

      const galleryCollection: IGallery[] = [{ id: 32171 }];
      jest.spyOn(galleryService, 'query').mockReturnValue(of(new HttpResponse({ body: galleryCollection })));
      const additionalGalleries = [gallery];
      const expectedCollection: IGallery[] = [...additionalGalleries, ...galleryCollection];
      jest.spyOn(galleryService, 'addGalleryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ files });
      comp.ngOnInit();

      expect(galleryService.query).toHaveBeenCalled();
      expect(galleryService.addGalleryToCollectionIfMissing).toHaveBeenCalledWith(
        galleryCollection,
        ...additionalGalleries.map(expect.objectContaining)
      );
      expect(comp.galleriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const files: IFiles = { id: 456 };
      const contentSession: IContentSession = { id: 34239 };
      files.contentSession = contentSession;
      const news: INews = { id: 77491 };
      files.news = news;
      const cadres: ICadres = { id: 3486 };
      files.cadres = cadres;
      const subject: ISubject = { id: 80906 };
      files.subject = subject;
      const gallery: IGallery = { id: 82657 };
      files.gallery = gallery;

      activatedRoute.data = of({ files });
      comp.ngOnInit();

      expect(comp.contentSessionsSharedCollection).toContain(contentSession);
      expect(comp.newsSharedCollection).toContain(news);
      expect(comp.cadresSharedCollection).toContain(cadres);
      expect(comp.subjectsSharedCollection).toContain(subject);
      expect(comp.galleriesSharedCollection).toContain(gallery);
      expect(comp.files).toEqual(files);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFiles>>();
      const files = { id: 123 };
      jest.spyOn(filesFormService, 'getFiles').mockReturnValue(files);
      jest.spyOn(filesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ files });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: files }));
      saveSubject.complete();

      // THEN
      expect(filesFormService.getFiles).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(filesService.update).toHaveBeenCalledWith(expect.objectContaining(files));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFiles>>();
      const files = { id: 123 };
      jest.spyOn(filesFormService, 'getFiles').mockReturnValue({ id: null });
      jest.spyOn(filesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ files: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: files }));
      saveSubject.complete();

      // THEN
      expect(filesFormService.getFiles).toHaveBeenCalled();
      expect(filesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFiles>>();
      const files = { id: 123 };
      jest.spyOn(filesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ files });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(filesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareContentSession', () => {
      it('Should forward to contentSessionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(contentSessionService, 'compareContentSession');
        comp.compareContentSession(entity, entity2);
        expect(contentSessionService.compareContentSession).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareNews', () => {
      it('Should forward to newsService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(newsService, 'compareNews');
        comp.compareNews(entity, entity2);
        expect(newsService.compareNews).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCadres', () => {
      it('Should forward to cadresService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(cadresService, 'compareCadres');
        comp.compareCadres(entity, entity2);
        expect(cadresService.compareCadres).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSubject', () => {
      it('Should forward to subjectService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(subjectService, 'compareSubject');
        comp.compareSubject(entity, entity2);
        expect(subjectService.compareSubject).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareGallery', () => {
      it('Should forward to galleryService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(galleryService, 'compareGallery');
        comp.compareGallery(entity, entity2);
        expect(galleryService.compareGallery).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
