import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { GalleryFormService, GalleryFormGroup } from './gallery-form.service';
import { IGallery } from '../gallery.model';
import { GalleryService } from '../service/gallery.service';
import { GalleryType } from 'app/entities/enumerations/gallery-type.model';

@Component({
  selector: 'jhi-gallery-update',
  templateUrl: './gallery-update.component.html',
})
export class GalleryUpdateComponent implements OnInit {
  isSaving = false;
  gallery: IGallery | null = null;
  galleryTypeValues = Object.keys(GalleryType);

  editForm: GalleryFormGroup = this.galleryFormService.createGalleryFormGroup();

  constructor(
    protected galleryService: GalleryService,
    protected galleryFormService: GalleryFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gallery }) => {
      this.gallery = gallery;
      if (gallery) {
        this.updateForm(gallery);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const gallery = this.galleryFormService.getGallery(this.editForm);
    if (gallery.id !== null) {
      this.subscribeToSaveResponse(this.galleryService.update(gallery));
    } else {
      this.subscribeToSaveResponse(this.galleryService.create(gallery));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGallery>>): void {
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

  protected updateForm(gallery: IGallery): void {
    this.gallery = gallery;
    this.galleryFormService.resetForm(this.editForm, gallery);
  }
}
