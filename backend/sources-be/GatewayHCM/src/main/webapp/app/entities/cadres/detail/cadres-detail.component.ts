import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICadres } from '../cadres.model';

@Component({
  selector: 'jhi-cadres-detail',
  templateUrl: './cadres-detail.component.html',
})
export class CadresDetailComponent implements OnInit {
  cadres: ICadres | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cadres }) => {
      this.cadres = cadres;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
