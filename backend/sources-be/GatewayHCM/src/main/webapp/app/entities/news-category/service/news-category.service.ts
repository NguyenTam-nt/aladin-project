import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INewsCategory, NewNewsCategory } from '../news-category.model';

export type PartialUpdateNewsCategory = Partial<INewsCategory> & Pick<INewsCategory, 'id'>;

export type EntityResponseType = HttpResponse<INewsCategory>;
export type EntityArrayResponseType = HttpResponse<INewsCategory[]>;

@Injectable({ providedIn: 'root' })
export class NewsCategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/news-categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(newsCategory: NewNewsCategory): Observable<EntityResponseType> {
    return this.http.post<INewsCategory>(this.resourceUrl, newsCategory, { observe: 'response' });
  }

  update(newsCategory: INewsCategory): Observable<EntityResponseType> {
    return this.http.put<INewsCategory>(`${this.resourceUrl}/${this.getNewsCategoryIdentifier(newsCategory)}`, newsCategory, {
      observe: 'response',
    });
  }

  partialUpdate(newsCategory: PartialUpdateNewsCategory): Observable<EntityResponseType> {
    return this.http.patch<INewsCategory>(`${this.resourceUrl}/${this.getNewsCategoryIdentifier(newsCategory)}`, newsCategory, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INewsCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INewsCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getNewsCategoryIdentifier(newsCategory: Pick<INewsCategory, 'id'>): number {
    return newsCategory.id;
  }

  compareNewsCategory(o1: Pick<INewsCategory, 'id'> | null, o2: Pick<INewsCategory, 'id'> | null): boolean {
    return o1 && o2 ? this.getNewsCategoryIdentifier(o1) === this.getNewsCategoryIdentifier(o2) : o1 === o2;
  }

  addNewsCategoryToCollectionIfMissing<Type extends Pick<INewsCategory, 'id'>>(
    newsCategoryCollection: Type[],
    ...newsCategoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const newsCategories: Type[] = newsCategoriesToCheck.filter(isPresent);
    if (newsCategories.length > 0) {
      const newsCategoryCollectionIdentifiers = newsCategoryCollection.map(
        newsCategoryItem => this.getNewsCategoryIdentifier(newsCategoryItem)!
      );
      const newsCategoriesToAdd = newsCategories.filter(newsCategoryItem => {
        const newsCategoryIdentifier = this.getNewsCategoryIdentifier(newsCategoryItem);
        if (newsCategoryCollectionIdentifiers.includes(newsCategoryIdentifier)) {
          return false;
        }
        newsCategoryCollectionIdentifiers.push(newsCategoryIdentifier);
        return true;
      });
      return [...newsCategoriesToAdd, ...newsCategoryCollection];
    }
    return newsCategoryCollection;
  }
}
