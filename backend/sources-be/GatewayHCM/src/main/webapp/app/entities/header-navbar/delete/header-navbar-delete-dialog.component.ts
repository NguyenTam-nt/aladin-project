import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IHeaderNavbar } from '../header-navbar.model';
import { HeaderNavbarService } from '../service/header-navbar.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './header-navbar-delete-dialog.component.html',
})
export class HeaderNavbarDeleteDialogComponent {
  headerNavbar?: IHeaderNavbar;

  constructor(protected headerNavbarService: HeaderNavbarService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.headerNavbarService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
