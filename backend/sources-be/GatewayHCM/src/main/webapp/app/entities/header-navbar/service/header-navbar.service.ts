import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHeaderNavbar, NewHeaderNavbar } from '../header-navbar.model';

export type PartialUpdateHeaderNavbar = Partial<IHeaderNavbar> & Pick<IHeaderNavbar, 'id'>;

export type EntityResponseType = HttpResponse<IHeaderNavbar>;
export type EntityArrayResponseType = HttpResponse<IHeaderNavbar[]>;

@Injectable({ providedIn: 'root' })
export class HeaderNavbarService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/header-navbars');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(headerNavbar: NewHeaderNavbar): Observable<EntityResponseType> {
    return this.http.post<IHeaderNavbar>(this.resourceUrl, headerNavbar, { observe: 'response' });
  }

  update(headerNavbar: IHeaderNavbar): Observable<EntityResponseType> {
    return this.http.put<IHeaderNavbar>(`${this.resourceUrl}/${this.getHeaderNavbarIdentifier(headerNavbar)}`, headerNavbar, {
      observe: 'response',
    });
  }

  partialUpdate(headerNavbar: PartialUpdateHeaderNavbar): Observable<EntityResponseType> {
    return this.http.patch<IHeaderNavbar>(`${this.resourceUrl}/${this.getHeaderNavbarIdentifier(headerNavbar)}`, headerNavbar, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHeaderNavbar>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHeaderNavbar[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getHeaderNavbarIdentifier(headerNavbar: Pick<IHeaderNavbar, 'id'>): number {
    return headerNavbar.id;
  }

  compareHeaderNavbar(o1: Pick<IHeaderNavbar, 'id'> | null, o2: Pick<IHeaderNavbar, 'id'> | null): boolean {
    return o1 && o2 ? this.getHeaderNavbarIdentifier(o1) === this.getHeaderNavbarIdentifier(o2) : o1 === o2;
  }

  addHeaderNavbarToCollectionIfMissing<Type extends Pick<IHeaderNavbar, 'id'>>(
    headerNavbarCollection: Type[],
    ...headerNavbarsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const headerNavbars: Type[] = headerNavbarsToCheck.filter(isPresent);
    if (headerNavbars.length > 0) {
      const headerNavbarCollectionIdentifiers = headerNavbarCollection.map(
        headerNavbarItem => this.getHeaderNavbarIdentifier(headerNavbarItem)!
      );
      const headerNavbarsToAdd = headerNavbars.filter(headerNavbarItem => {
        const headerNavbarIdentifier = this.getHeaderNavbarIdentifier(headerNavbarItem);
        if (headerNavbarCollectionIdentifiers.includes(headerNavbarIdentifier)) {
          return false;
        }
        headerNavbarCollectionIdentifiers.push(headerNavbarIdentifier);
        return true;
      });
      return [...headerNavbarsToAdd, ...headerNavbarCollection];
    }
    return headerNavbarCollection;
  }
}
