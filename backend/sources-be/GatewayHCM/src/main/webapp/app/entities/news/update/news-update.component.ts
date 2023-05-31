import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { NewsFormService, NewsFormGroup } from './news-form.service';
import { INews } from '../news.model';
import { NewsService } from '../service/news.service';
import { INewsCategory } from 'app/entities/news-category/news-category.model';
import { NewsCategoryService } from 'app/entities/news-category/service/news-category.service';

@Component({
  selector: 'jhi-news-update',
  templateUrl: './news-update.component.html',
})
export class NewsUpdateComponent implements OnInit {
  isSaving = false;
  news: INews | null = null;

  newsCategoriesSharedCollection: INewsCategory[] = [];

  editForm: NewsFormGroup = this.newsFormService.createNewsFormGroup();

  constructor(
    protected newsService: NewsService,
    protected newsFormService: NewsFormService,
    protected newsCategoryService: NewsCategoryService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareNewsCategory = (o1: INewsCategory | null, o2: INewsCategory | null): boolean =>
    this.newsCategoryService.compareNewsCategory(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ news }) => {
      this.news = news;
      if (news) {
        this.updateForm(news);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const news = this.newsFormService.getNews(this.editForm);
    if (news.id !== null) {
      this.subscribeToSaveResponse(this.newsService.update(news));
    } else {
      this.subscribeToSaveResponse(this.newsService.create(news));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INews>>): void {
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

  protected updateForm(news: INews): void {
    this.news = news;
    this.newsFormService.resetForm(this.editForm, news);

    this.newsCategoriesSharedCollection = this.newsCategoryService.addNewsCategoryToCollectionIfMissing<INewsCategory>(
      this.newsCategoriesSharedCollection,
      news.newsCategory
    );
  }

  protected loadRelationshipsOptions(): void {
    this.newsCategoryService
      .query()
      .pipe(map((res: HttpResponse<INewsCategory[]>) => res.body ?? []))
      .pipe(
        map((newsCategories: INewsCategory[]) =>
          this.newsCategoryService.addNewsCategoryToCollectionIfMissing<INewsCategory>(newsCategories, this.news?.newsCategory)
        )
      )
      .subscribe((newsCategories: INewsCategory[]) => (this.newsCategoriesSharedCollection = newsCategories));
  }
}
