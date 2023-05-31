import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { GalleryComponent } from '../list/gallery.component';
import { GalleryDetailComponent } from '../detail/gallery-detail.component';
import { GalleryUpdateComponent } from '../update/gallery-update.component';
import { GalleryRoutingResolveService } from './gallery-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const galleryRoute: Routes = [
  {
    path: '',
    component: GalleryComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GalleryDetailComponent,
    resolve: {
      gallery: GalleryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GalleryUpdateComponent,
    resolve: {
      gallery: GalleryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GalleryUpdateComponent,
    resolve: {
      gallery: GalleryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(galleryRoute)],
  exports: [RouterModule],
})
export class GalleryRoutingModule {}
