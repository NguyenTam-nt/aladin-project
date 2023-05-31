import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICadresCategory } from '../cadres-category.model';
import { CadresCategoryService } from '../service/cadres-category.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './cadres-category-delete-dialog.component.html',
})
export class CadresCategoryDeleteDialogComponent {
  cadresCategory?: ICadresCategory;

  constructor(protected cadresCategoryService: CadresCategoryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cadresCategoryService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
