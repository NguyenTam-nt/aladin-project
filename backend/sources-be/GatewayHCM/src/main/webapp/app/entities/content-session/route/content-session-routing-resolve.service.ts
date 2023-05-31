import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IContentSession } from '../content-session.model';
import { ContentSessionService } from '../service/content-session.service';

@Injectable({ providedIn: 'root' })
export class ContentSessionRoutingResolveService implements Resolve<IContentSession | null> {
  constructor(protected service: ContentSessionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContentSession | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((contentSession: HttpResponse<IContentSession>) => {
          if (contentSession.body) {
            return of(contentSession.body);
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
