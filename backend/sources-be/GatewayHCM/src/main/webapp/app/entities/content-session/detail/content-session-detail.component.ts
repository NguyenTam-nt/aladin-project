import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContentSession } from '../content-session.model';

@Component({
  selector: 'jhi-content-session-detail',
  templateUrl: './content-session-detail.component.html',
})
export class ContentSessionDetailComponent implements OnInit {
  contentSession: IContentSession | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contentSession }) => {
      this.contentSession = contentSession;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
