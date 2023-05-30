import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ContentSessionComponent } from '../list/content-session.component';
import { ContentSessionDetailComponent } from '../detail/content-session-detail.component';
import { ContentSessionUpdateComponent } from '../update/content-session-update.component';
import { ContentSessionRoutingResolveService } from './content-session-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const contentSessionRoute: Routes = [
  {
    path: '',
    component: ContentSessionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContentSessionDetailComponent,
    resolve: {
      contentSession: ContentSessionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContentSessionUpdateComponent,
    resolve: {
      contentSession: ContentSessionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContentSessionUpdateComponent,
    resolve: {
      contentSession: ContentSessionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(contentSessionRoute)],
  exports: [RouterModule],
})
export class ContentSessionRoutingModule {}
