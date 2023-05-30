import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CadresCategoryComponent } from './list/cadres-category.component';
import { CadresCategoryDetailComponent } from './detail/cadres-category-detail.component';
import { CadresCategoryUpdateComponent } from './update/cadres-category-update.component';
import { CadresCategoryDeleteDialogComponent } from './delete/cadres-category-delete-dialog.component';
import { CadresCategoryRoutingModule } from './route/cadres-category-routing.module';

@NgModule({
  imports: [SharedModule, CadresCategoryRoutingModule],
  declarations: [
    CadresCategoryComponent,
    CadresCategoryDetailComponent,
    CadresCategoryUpdateComponent,
    CadresCategoryDeleteDialogComponent,
  ],
})
export class CadresCategoryModule {}
