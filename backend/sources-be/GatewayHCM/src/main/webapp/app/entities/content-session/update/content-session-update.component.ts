import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ContentSessionFormService, ContentSessionFormGroup } from './content-session-form.service';
import { IContentSession } from '../content-session.model';
import { ContentSessionService } from '../service/content-session.service';

@Component({
  selector: 'jhi-content-session-update',
  templateUrl: './content-session-update.component.html',
})
export class ContentSessionUpdateComponent implements OnInit {
  isSaving = false;
  contentSession: IContentSession | null = null;

  editForm: ContentSessionFormGroup = this.contentSessionFormService.createContentSessionFormGroup();

  constructor(
    protected contentSessionService: ContentSessionService,
    protected contentSessionFormService: ContentSessionFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contentSession }) => {
      this.contentSession = contentSession;
      if (contentSession) {
        this.updateForm(contentSession);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contentSession = this.contentSessionFormService.getContentSession(this.editForm);
    if (contentSession.id !== null) {
      this.subscribeToSaveResponse(this.contentSessionService.update(contentSession));
    } else {
      this.subscribeToSaveResponse(this.contentSessionService.create(contentSession));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContentSession>>): void {
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

  protected updateForm(contentSession: IContentSession): void {
    this.contentSession = contentSession;
    this.contentSessionFormService.resetForm(this.editForm, contentSession);
  }
}
