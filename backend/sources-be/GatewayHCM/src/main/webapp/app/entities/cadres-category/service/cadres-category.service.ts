import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICadresCategory, NewCadresCategory } from '../cadres-category.model';

export type PartialUpdateCadresCategory = Partial<ICadresCategory> & Pick<ICadresCategory, 'id'>;

export type EntityResponseType = HttpResponse<ICadresCategory>;
export type EntityArrayResponseType = HttpResponse<ICadresCategory[]>;

@Injectable({ providedIn: 'root' })
export class CadresCategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cadres-categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cadresCategory: NewCadresCategory): Observable<EntityResponseType> {
    return this.http.post<ICadresCategory>(this.resourceUrl, cadresCategory, { observe: 'response' });
  }

  update(cadresCategory: ICadresCategory): Observable<EntityResponseType> {
    return this.http.put<ICadresCategory>(`${this.resourceUrl}/${this.getCadresCategoryIdentifier(cadresCategory)}`, cadresCategory, {
      observe: 'response',
    });
  }

  partialUpdate(cadresCategory: PartialUpdateCadresCategory): Observable<EntityResponseType> {
    return this.http.patch<ICadresCategory>(`${this.resourceUrl}/${this.getCadresCategoryIdentifier(cadresCategory)}`, cadresCategory, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICadresCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICadresCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCadresCategoryIdentifier(cadresCategory: Pick<ICadresCategory, 'id'>): number {
    return cadresCategory.id;
  }

  compareCadresCategory(o1: Pick<ICadresCategory, 'id'> | null, o2: Pick<ICadresCategory, 'id'> | null): boolean {
    return o1 && o2 ? this.getCadresCategoryIdentifier(o1) === this.getCadresCategoryIdentifier(o2) : o1 === o2;
  }

  addCadresCategoryToCollectionIfMissing<Type extends Pick<ICadresCategory, 'id'>>(
    cadresCategoryCollection: Type[],
    ...cadresCategoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cadresCategories: Type[] = cadresCategoriesToCheck.filter(isPresent);
    if (cadresCategories.length > 0) {
      const cadresCategoryCollectionIdentifiers = cadresCategoryCollection.map(
        cadresCategoryItem => this.getCadresCategoryIdentifier(cadresCategoryItem)!
      );
      const cadresCategoriesToAdd = cadresCategories.filter(cadresCategoryItem => {
        const cadresCategoryIdentifier = this.getCadresCategoryIdentifier(cadresCategoryItem);
        if (cadresCategoryCollectionIdentifiers.includes(cadresCategoryIdentifier)) {
          return false;
        }
        cadresCategoryCollectionIdentifiers.push(cadresCategoryIdentifier);
        return true;
      });
      return [...cadresCategoriesToAdd, ...cadresCategoryCollection];
    }
    return cadresCategoryCollection;
  }
}
