import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICadres, NewCadres } from '../cadres.model';

export type PartialUpdateCadres = Partial<ICadres> & Pick<ICadres, 'id'>;

export type EntityResponseType = HttpResponse<ICadres>;
export type EntityArrayResponseType = HttpResponse<ICadres[]>;

@Injectable({ providedIn: 'root' })
export class CadresService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cadres');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cadres: NewCadres): Observable<EntityResponseType> {
    return this.http.post<ICadres>(this.resourceUrl, cadres, { observe: 'response' });
  }

  update(cadres: ICadres): Observable<EntityResponseType> {
    return this.http.put<ICadres>(`${this.resourceUrl}/${this.getCadresIdentifier(cadres)}`, cadres, { observe: 'response' });
  }

  partialUpdate(cadres: PartialUpdateCadres): Observable<EntityResponseType> {
    return this.http.patch<ICadres>(`${this.resourceUrl}/${this.getCadresIdentifier(cadres)}`, cadres, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICadres>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICadres[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCadresIdentifier(cadres: Pick<ICadres, 'id'>): number {
    return cadres.id;
  }

  compareCadres(o1: Pick<ICadres, 'id'> | null, o2: Pick<ICadres, 'id'> | null): boolean {
    return o1 && o2 ? this.getCadresIdentifier(o1) === this.getCadresIdentifier(o2) : o1 === o2;
  }

  addCadresToCollectionIfMissing<Type extends Pick<ICadres, 'id'>>(
    cadresCollection: Type[],
    ...cadresToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cadres: Type[] = cadresToCheck.filter(isPresent);
    if (cadres.length > 0) {
      const cadresCollectionIdentifiers = cadresCollection.map(cadresItem => this.getCadresIdentifier(cadresItem)!);
      const cadresToAdd = cadres.filter(cadresItem => {
        const cadresIdentifier = this.getCadresIdentifier(cadresItem);
        if (cadresCollectionIdentifiers.includes(cadresIdentifier)) {
          return false;
        }
        cadresCollectionIdentifiers.push(cadresIdentifier);
        return true;
      });
      return [...cadresToAdd, ...cadresCollection];
    }
    return cadresCollection;
  }
}
