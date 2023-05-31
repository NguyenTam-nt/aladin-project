import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { NewsCategoryFormService, NewsCategoryFormGroup } from './news-category-form.service';
import { INewsCategory } from '../news-category.model';
import { NewsCategoryService } from '../service/news-category.service';

@Component({
  selector: 'jhi-news-category-update',
  templateUrl: './news-category-update.component.html',
})
export class NewsCategoryUpdateComponent implements OnInit {
  isSaving = false;
  newsCategory: INewsCategory | null = null;

  editForm: NewsCategoryFormGroup = this.newsCategoryFormService.createNewsCategoryFormGroup();

  constructor(
    protected newsCategoryService: NewsCategoryService,
    protected newsCategoryFormService: NewsCategoryFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ newsCategory }) => {
      this.newsCategory = newsCategory;
      if (newsCategory) {
        this.updateForm(newsCategory);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const newsCategory = this.newsCategoryFormService.getNewsCategory(this.editForm);
    if (newsCategory.id !== null) {
      this.subscribeToSaveResponse(this.newsCategoryService.update(newsCategory));
    } else {
      this.subscribeToSaveResponse(this.newsCategoryService.create(newsCategory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INewsCategory>>): void {
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

  protected updateForm(newsCategory: INewsCategory): void {
    this.newsCategory = newsCategory;
    this.newsCategoryFormService.resetForm(this.editForm, newsCategory);
  }
}
