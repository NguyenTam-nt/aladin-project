import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CadresComponent } from '../list/cadres.component';
import { CadresDetailComponent } from '../detail/cadres-detail.component';
import { CadresUpdateComponent } from '../update/cadres-update.component';
import { CadresRoutingResolveService } from './cadres-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const cadresRoute: Routes = [
  {
    path: '',
    component: CadresComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CadresDetailComponent,
    resolve: {
      cadres: CadresRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CadresUpdateComponent,
    resolve: {
      cadres: CadresRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CadresUpdateComponent,
    resolve: {
      cadres: CadresRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cadresRoute)],
  exports: [RouterModule],
})
export class CadresRoutingModule {}
