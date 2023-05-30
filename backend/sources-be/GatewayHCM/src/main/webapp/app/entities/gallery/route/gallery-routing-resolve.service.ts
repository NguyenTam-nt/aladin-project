import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IGallery } from '../gallery.model';
import { GalleryService } from '../service/gallery.service';

@Injectable({ providedIn: 'root' })
export class GalleryRoutingResolveService implements Resolve<IGallery | null> {
  constructor(protected service: GalleryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGallery | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((gallery: HttpResponse<IGallery>) => {
          if (gallery.body) {
            return of(gallery.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
