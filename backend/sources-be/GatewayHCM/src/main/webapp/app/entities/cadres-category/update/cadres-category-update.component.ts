import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CadresCategoryFormService, CadresCategoryFormGroup } from './cadres-category-form.service';
import { ICadresCategory } from '../cadres-category.model';
import { CadresCategoryService } from '../service/cadres-category.service';
import { ICadres } from 'app/entities/cadres/cadres.model';
import { CadresService } from 'app/entities/cadres/service/cadres.service';

@Component({
  selector: 'jhi-cadres-category-update',
  templateUrl: './cadres-category-update.component.html',
})
export class CadresCategoryUpdateComponent implements OnInit {
  isSaving = false;
  cadresCategory: ICadresCategory | null = null;

  cadresSharedCollection: ICadres[] = [];

  editForm: CadresCategoryFormGroup = this.cadresCategoryFormService.createCadresCategoryFormGroup();

  constructor(
    protected cadresCategoryService: CadresCategoryService,
    protected cadresCategoryFormService: CadresCategoryFormService,
    protected cadresService: CadresService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCadres = (o1: ICadres | null, o2: ICadres | null): boolean => this.cadresService.compareCadres(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cadresCategory }) => {
      this.cadresCategory = cadresCategory;
      if (cadresCategory) {
        this.updateForm(cadresCategory);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cadresCategory = this.cadresCategoryFormService.getCadresCategory(this.editForm);
    if (cadresCategory.id !== null) {
      this.subscribeToSaveResponse(this.cadresCategoryService.update(cadresCategory));
    } else {
      this.subscribeToSaveResponse(this.cadresCategoryService.create(cadresCategory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICadresCategory>>): void {
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

  protected updateForm(cadresCategory: ICadresCategory): void {
    this.cadresCategory = cadresCategory;
    this.cadresCategoryFormService.resetForm(this.editForm, cadresCategory);

    this.cadresSharedCollection = this.cadresService.addCadresToCollectionIfMissing<ICadres>(
      this.cadresSharedCollection,
      cadresCategory.cadres
    );
  }

  protected loadRelationshipsOptions(): void {
    this.cadresService
      .query()
      .pipe(map((res: HttpResponse<ICadres[]>) => res.body ?? []))
      .pipe(map((cadres: ICadres[]) => this.cadresService.addCadresToCollectionIfMissing<ICadres>(cadres, this.cadresCategory?.cadres)))
      .subscribe((cadres: ICadres[]) => (this.cadresSharedCollection = cadres));
  }
}
