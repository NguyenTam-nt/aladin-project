import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { NewsCategoryComponent } from '../list/news-category.component';
import { NewsCategoryDetailComponent } from '../detail/news-category-detail.component';
import { NewsCategoryUpdateComponent } from '../update/news-category-update.component';
import { NewsCategoryRoutingResolveService } from './news-category-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const newsCategoryRoute: Routes = [
  {
    path: '',
    component: NewsCategoryComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NewsCategoryDetailComponent,
    resolve: {
      newsCategory: NewsCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NewsCategoryUpdateComponent,
    resolve: {
      newsCategory: NewsCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NewsCategoryUpdateComponent,
    resolve: {
      newsCategory: NewsCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(newsCategoryRoute)],
  exports: [RouterModule],
})
export class NewsCategoryRoutingModule {}
