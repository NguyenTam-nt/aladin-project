import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGallery } from '../gallery.model';

@Component({
  selector: 'jhi-gallery-detail',
  templateUrl: './gallery-detail.component.html',
})
export class GalleryDetailComponent implements OnInit {
  gallery: IGallery | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gallery }) => {
      this.gallery = gallery;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
