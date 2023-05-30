import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CadresFormService, CadresFormGroup } from './cadres-form.service';
import { ICadres } from '../cadres.model';
import { CadresService } from '../service/cadres.service';

@Component({
  selector: 'jhi-cadres-update',
  templateUrl: './cadres-update.component.html',
})
export class CadresUpdateComponent implements OnInit {
  isSaving = false;
  cadres: ICadres | null = null;

  editForm: CadresFormGroup = this.cadresFormService.createCadresFormGroup();

  constructor(
    protected cadresService: CadresService,
    protected cadresFormService: CadresFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cadres }) => {
      this.cadres = cadres;
      if (cadres) {
        this.updateForm(cadres);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cadres = this.cadresFormService.getCadres(this.editForm);
    if (cadres.id !== null) {
      this.subscribeToSaveResponse(this.cadresService.update(cadres));
    } else {
      this.subscribeToSaveResponse(this.cadresService.create(cadres));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICadres>>): void {
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

  protected updateForm(cadres: ICadres): void {
    this.cadres = cadres;
    this.cadresFormService.resetForm(this.editForm, cadres);
  }
}
