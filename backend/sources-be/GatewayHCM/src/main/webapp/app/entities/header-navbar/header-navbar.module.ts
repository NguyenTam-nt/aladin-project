import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HeaderNavbarComponent } from './list/header-navbar.component';
import { HeaderNavbarDetailComponent } from './detail/header-navbar-detail.component';
import { HeaderNavbarUpdateComponent } from './update/header-navbar-update.component';
import { HeaderNavbarDeleteDialogComponent } from './delete/header-navbar-delete-dialog.component';
import { HeaderNavbarRoutingModule } from './route/header-navbar-routing.module';

@NgModule({
  imports: [SharedModule, HeaderNavbarRoutingModule],
  declarations: [HeaderNavbarComponent, HeaderNavbarDetailComponent, HeaderNavbarUpdateComponent, HeaderNavbarDeleteDialogComponent],
})
export class HeaderNavbarModule {}
