import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { GalleryComponent } from './list/gallery.component';
import { GalleryDetailComponent } from './detail/gallery-detail.component';
import { GalleryUpdateComponent } from './update/gallery-update.component';
import { GalleryDeleteDialogComponent } from './delete/gallery-delete-dialog.component';
import { GalleryRoutingModule } from './route/gallery-routing.module';

@NgModule({
  imports: [SharedModule, GalleryRoutingModule],
  declarations: [GalleryComponent, GalleryDetailComponent, GalleryUpdateComponent, GalleryDeleteDialogComponent],
})
export class GalleryModule {}
