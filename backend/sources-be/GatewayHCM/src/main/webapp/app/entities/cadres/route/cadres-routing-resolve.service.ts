import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICadres } from '../cadres.model';
import { CadresService } from '../service/cadres.service';

@Injectable({ providedIn: 'root' })
export class CadresRoutingResolveService implements Resolve<ICadres | null> {
  constructor(protected service: CadresService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICadres | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cadres: HttpResponse<ICadres>) => {
          if (cadres.body) {
            return of(cadres.body);
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
