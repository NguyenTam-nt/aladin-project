import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IContentSession } from '../content-session.model';
import { ContentSessionService } from '../service/content-session.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './content-session-delete-dialog.component.html',
})
export class ContentSessionDeleteDialogComponent {
  contentSession?: IContentSession;

  constructor(protected contentSessionService: ContentSessionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contentSessionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
