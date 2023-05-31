import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { INewsCategory } from '../news-category.model';
import { NewsCategoryService } from '../service/news-category.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './news-category-delete-dialog.component.html',
})
export class NewsCategoryDeleteDialogComponent {
  newsCategory?: INewsCategory;

  constructor(protected newsCategoryService: NewsCategoryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.newsCategoryService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
