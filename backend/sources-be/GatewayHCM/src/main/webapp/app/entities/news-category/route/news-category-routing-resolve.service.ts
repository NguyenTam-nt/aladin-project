import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INewsCategory } from '../news-category.model';
import { NewsCategoryService } from '../service/news-category.service';

@Injectable({ providedIn: 'root' })
export class NewsCategoryRoutingResolveService implements Resolve<INewsCategory | null> {
  constructor(protected service: NewsCategoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INewsCategory | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((newsCategory: HttpResponse<INewsCategory>) => {
          if (newsCategory.body) {
            return of(newsCategory.body);
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
