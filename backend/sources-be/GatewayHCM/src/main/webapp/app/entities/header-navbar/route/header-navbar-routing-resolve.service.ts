import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHeaderNavbar } from '../header-navbar.model';
import { HeaderNavbarService } from '../service/header-navbar.service';

@Injectable({ providedIn: 'root' })
export class HeaderNavbarRoutingResolveService implements Resolve<IHeaderNavbar | null> {
  constructor(protected service: HeaderNavbarService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHeaderNavbar | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((headerNavbar: HttpResponse<IHeaderNavbar>) => {
          if (headerNavbar.body) {
            return of(headerNavbar.body);
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
