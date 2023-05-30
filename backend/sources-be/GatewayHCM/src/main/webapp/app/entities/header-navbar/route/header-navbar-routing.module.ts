import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { HeaderNavbarComponent } from '../list/header-navbar.component';
import { HeaderNavbarDetailComponent } from '../detail/header-navbar-detail.component';
import { HeaderNavbarUpdateComponent } from '../update/header-navbar-update.component';
import { HeaderNavbarRoutingResolveService } from './header-navbar-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const headerNavbarRoute: Routes = [
  {
    path: '',
    component: HeaderNavbarComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HeaderNavbarDetailComponent,
    resolve: {
      headerNavbar: HeaderNavbarRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HeaderNavbarUpdateComponent,
    resolve: {
      headerNavbar: HeaderNavbarRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HeaderNavbarUpdateComponent,
    resolve: {
      headerNavbar: HeaderNavbarRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(headerNavbarRoute)],
  exports: [RouterModule],
})
export class HeaderNavbarRoutingModule {}
