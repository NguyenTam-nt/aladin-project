import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FilesFormService, FilesFormGroup } from './files-form.service';
import { IFiles } from '../files.model';
import { FilesService } from '../service/files.service';
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

@Component({
  selector: 'jhi-files-update',
  templateUrl: './files-update.component.html',
})
export class FilesUpdateComponent implements OnInit {
  isSaving = false;
  files: IFiles | null = null;

  contentSessionsSharedCollection: IContentSession[] = [];
  newsSharedCollection: INews[] = [];
  cadresSharedCollection: ICadres[] = [];
  subjectsSharedCollection: ISubject[] = [];
  galleriesSharedCollection: IGallery[] = [];

  editForm: FilesFormGroup = this.filesFormService.createFilesFormGroup();

  constructor(
    protected filesService: FilesService,
    protected filesFormService: FilesFormService,
    protected contentSessionService: ContentSessionService,
    protected newsService: NewsService,
    protected cadresService: CadresService,
    protected subjectService: SubjectService,
    protected galleryService: GalleryService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareContentSession = (o1: IContentSession | null, o2: IContentSession | null): boolean =>
    this.contentSessionService.compareContentSession(o1, o2);

  compareNews = (o1: INews | null, o2: INews | null): boolean => this.newsService.compareNews(o1, o2);

  compareCadres = (o1: ICadres | null, o2: ICadres | null): boolean => this.cadresService.compareCadres(o1, o2);

  compareSubject = (o1: ISubject | null, o2: ISubject | null): boolean => this.subjectService.compareSubject(o1, o2);

  compareGallery = (o1: IGallery | null, o2: IGallery | null): boolean => this.galleryService.compareGallery(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ files }) => {
      this.files = files;
      if (files) {
        this.updateForm(files);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const files = this.filesFormService.getFiles(this.editForm);
    if (files.id !== null) {
      this.subscribeToSaveResponse(this.filesService.update(files));
    } else {
      this.subscribeToSaveResponse(this.filesService.create(files));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFiles>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(files: IFiles): void {
    this.files = files;
    this.filesFormService.resetForm(this.editForm, files);

    this.contentSessionsSharedCollection = this.contentSessionService.addContentSessionToCollectionIfMissing<IContentSession>(
      this.contentSessionsSharedCollection,
      files.contentSession
    );
    this.newsSharedCollection = this.newsService.addNewsToCollectionIfMissing<INews>(this.newsSharedCollection, files.news);
    this.cadresSharedCollection = this.cadresService.addCadresToCollectionIfMissing<ICadres>(this.cadresSharedCollection, files.cadres);
    this.subjectsSharedCollection = this.subjectService.addSubjectToCollectionIfMissing<ISubject>(
      this.subjectsSharedCollection,
      files.subject
    );
    this.galleriesSharedCollection = this.galleryService.addGalleryToCollectionIfMissing<IGallery>(
      this.galleriesSharedCollection,
      files.gallery
    );
  }

  protected loadRelationshipsOptions(): void {
    this.contentSessionService
      .query()
      .pipe(map((res: HttpResponse<IContentSession[]>) => res.body ?? []))
      .pipe(
        map((contentSessions: IContentSession[]) =>
          this.contentSessionService.addContentSessionToCollectionIfMissing<IContentSession>(contentSessions, this.files?.contentSession)
        )
      )
      .subscribe((contentSessions: IContentSession[]) => (this.contentSessionsSharedCollection = contentSessions));

    this.newsService
      .query()
      .pipe(map((res: HttpResponse<INews[]>) => res.body ?? []))
      .pipe(map((news: INews[]) => this.newsService.addNewsToCollectionIfMissing<INews>(news, this.files?.news)))
      .subscribe((news: INews[]) => (this.newsSharedCollection = news));

    this.cadresService
      .query()
      .pipe(map((res: HttpResponse<ICadres[]>) => res.body ?? []))
      .pipe(map((cadres: ICadres[]) => this.cadresService.addCadresToCollectionIfMissing<ICadres>(cadres, this.files?.cadres)))
      .subscribe((cadres: ICadres[]) => (this.cadresSharedCollection = cadres));

    this.subjectService
      .query()
      .pipe(map((res: HttpResponse<ISubject[]>) => res.body ?? []))
      .pipe(map((subjects: ISubject[]) => this.subjectService.addSubjectToCollectionIfMissing<ISubject>(subjects, this.files?.subject)))
      .subscribe((subjects: ISubject[]) => (this.subjectsSharedCollection = subjects));

    this.galleryService
      .query()
      .pipe(map((res: HttpResponse<IGallery[]>) => res.body ?? []))
      .pipe(map((galleries: IGallery[]) => this.galleryService.addGalleryToCollectionIfMissing<IGallery>(galleries, this.files?.gallery)))
      .subscribe((galleries: IGallery[]) => (this.galleriesSharedCollection = galleries));
  }
}
