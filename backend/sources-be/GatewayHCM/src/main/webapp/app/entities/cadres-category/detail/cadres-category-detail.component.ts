import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICadresCategory } from '../cadres-category.model';

@Component({
  selector: 'jhi-cadres-category-detail',
  templateUrl: './cadres-category-detail.component.html',
})
export class CadresCategoryDetailComponent implements OnInit {
  cadresCategory: ICadresCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cadresCategory }) => {
      this.cadresCategory = cadresCategory;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
