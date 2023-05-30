import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INewsCategory } from '../news-category.model';

@Component({
  selector: 'jhi-news-category-detail',
  templateUrl: './news-category-detail.component.html',
})
export class NewsCategoryDetailComponent implements OnInit {
  newsCategory: INewsCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ newsCategory }) => {
      this.newsCategory = newsCategory;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
