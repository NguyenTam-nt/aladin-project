import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CadresComponent } from './list/cadres.component';
import { CadresDetailComponent } from './detail/cadres-detail.component';
import { CadresUpdateComponent } from './update/cadres-update.component';
import { CadresDeleteDialogComponent } from './delete/cadres-delete-dialog.component';
import { CadresRoutingModule } from './route/cadres-routing.module';

@NgModule({
  imports: [SharedModule, CadresRoutingModule],
  declarations: [CadresComponent, CadresDetailComponent, CadresUpdateComponent, CadresDeleteDialogComponent],
})
export class CadresModule {}
