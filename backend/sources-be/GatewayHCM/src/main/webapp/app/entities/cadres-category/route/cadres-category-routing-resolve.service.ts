import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICadresCategory } from '../cadres-category.model';
import { CadresCategoryService } from '../service/cadres-category.service';

@Injectable({ providedIn: 'root' })
export class CadresCategoryRoutingResolveService implements Resolve<ICadresCategory | null> {
  constructor(protected service: CadresCategoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICadresCategory | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cadresCategory: HttpResponse<ICadresCategory>) => {
          if (cadresCategory.body) {
            return of(cadresCategory.body);
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
