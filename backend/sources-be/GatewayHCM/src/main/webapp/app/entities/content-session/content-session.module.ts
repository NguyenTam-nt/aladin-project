import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ContentSessionComponent } from './list/content-session.component';
import { ContentSessionDetailComponent } from './detail/content-session-detail.component';
import { ContentSessionUpdateComponent } from './update/content-session-update.component';
import { ContentSessionDeleteDialogComponent } from './delete/content-session-delete-dialog.component';
import { ContentSessionRoutingModule } from './route/content-session-routing.module';

@NgModule({
  imports: [SharedModule, ContentSessionRoutingModule],
  declarations: [
    ContentSessionComponent,
    ContentSessionDetailComponent,
    ContentSessionUpdateComponent,
    ContentSessionDeleteDialogComponent,
  ],
})
export class ContentSessionModule {}
