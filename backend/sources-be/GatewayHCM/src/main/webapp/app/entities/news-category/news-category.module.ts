import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { NewsCategoryComponent } from './list/news-category.component';
import { NewsCategoryDetailComponent } from './detail/news-category-detail.component';
import { NewsCategoryUpdateComponent } from './update/news-category-update.component';
import { NewsCategoryDeleteDialogComponent } from './delete/news-category-delete-dialog.component';
import { NewsCategoryRoutingModule } from './route/news-category-routing.module';

@NgModule({
  imports: [SharedModule, NewsCategoryRoutingModule],
  declarations: [NewsCategoryComponent, NewsCategoryDetailComponent, NewsCategoryUpdateComponent, NewsCategoryDeleteDialogComponent],
})
export class NewsCategoryModule {}
