import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IGallery } from '../gallery.model';
import { GalleryService } from '../service/gallery.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './gallery-delete-dialog.component.html',
})
export class GalleryDeleteDialogComponent {
  gallery?: IGallery;

  constructor(protected galleryService: GalleryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.galleryService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
