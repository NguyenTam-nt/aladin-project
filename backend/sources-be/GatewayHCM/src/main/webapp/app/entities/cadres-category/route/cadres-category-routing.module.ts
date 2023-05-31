import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CadresCategoryComponent } from '../list/cadres-category.component';
import { CadresCategoryDetailComponent } from '../detail/cadres-category-detail.component';
import { CadresCategoryUpdateComponent } from '../update/cadres-category-update.component';
import { CadresCategoryRoutingResolveService } from './cadres-category-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const cadresCategoryRoute: Routes = [
  {
    path: '',
    component: CadresCategoryComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CadresCategoryDetailComponent,
    resolve: {
      cadresCategory: CadresCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CadresCategoryUpdateComponent,
    resolve: {
      cadresCategory: CadresCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CadresCategoryUpdateComponent,
    resolve: {
      cadresCategory: CadresCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cadresCategoryRoute)],
  exports: [RouterModule],
})
export class CadresCategoryRoutingModule {}
