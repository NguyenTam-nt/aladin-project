import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { HeaderNavbarFormService, HeaderNavbarFormGroup } from './header-navbar-form.service';
import { IHeaderNavbar } from '../header-navbar.model';
import { HeaderNavbarService } from '../service/header-navbar.service';

@Component({
  selector: 'jhi-header-navbar-update',
  templateUrl: './header-navbar-update.component.html',
})
export class HeaderNavbarUpdateComponent implements OnInit {
  isSaving = false;
  headerNavbar: IHeaderNavbar | null = null;

  editForm: HeaderNavbarFormGroup = this.headerNavbarFormService.createHeaderNavbarFormGroup();

  constructor(
    protected headerNavbarService: HeaderNavbarService,
    protected headerNavbarFormService: HeaderNavbarFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ headerNavbar }) => {
      this.headerNavbar = headerNavbar;
      if (headerNavbar) {
        this.updateForm(headerNavbar);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const headerNavbar = this.headerNavbarFormService.getHeaderNavbar(this.editForm);
    if (headerNavbar.id !== null) {
      this.subscribeToSaveResponse(this.headerNavbarService.update(headerNavbar));
    } else {
      this.subscribeToSaveResponse(this.headerNavbarService.create(headerNavbar));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHeaderNavbar>>): void {
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

  protected updateForm(headerNavbar: IHeaderNavbar): void {
    this.headerNavbar = headerNavbar;
    this.headerNavbarFormService.resetForm(this.editForm, headerNavbar);
  }
}
