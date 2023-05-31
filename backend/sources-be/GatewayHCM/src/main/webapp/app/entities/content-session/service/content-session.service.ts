import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IContentSession, NewContentSession } from '../content-session.model';

export type PartialUpdateContentSession = Partial<IContentSession> & Pick<IContentSession, 'id'>;

export type EntityResponseType = HttpResponse<IContentSession>;
export type EntityArrayResponseType = HttpResponse<IContentSession[]>;

@Injectable({ providedIn: 'root' })
export class ContentSessionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/content-sessions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(contentSession: NewContentSession): Observable<EntityResponseType> {
    return this.http.post<IContentSession>(this.resourceUrl, contentSession, { observe: 'response' });
  }

  update(contentSession: IContentSession): Observable<EntityResponseType> {
    return this.http.put<IContentSession>(`${this.resourceUrl}/${this.getContentSessionIdentifier(contentSession)}`, contentSession, {
      observe: 'response',
    });
  }

  partialUpdate(contentSession: PartialUpdateContentSession): Observable<EntityResponseType> {
    return this.http.patch<IContentSession>(`${this.resourceUrl}/${this.getContentSessionIdentifier(contentSession)}`, contentSession, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContentSession>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContentSession[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getContentSessionIdentifier(contentSession: Pick<IContentSession, 'id'>): number {
    return contentSession.id;
  }

  compareContentSession(o1: Pick<IContentSession, 'id'> | null, o2: Pick<IContentSession, 'id'> | null): boolean {
    return o1 && o2 ? this.getContentSessionIdentifier(o1) === this.getContentSessionIdentifier(o2) : o1 === o2;
  }

  addContentSessionToCollectionIfMissing<Type extends Pick<IContentSession, 'id'>>(
    contentSessionCollection: Type[],
    ...contentSessionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const contentSessions: Type[] = contentSessionsToCheck.filter(isPresent);
    if (contentSessions.length > 0) {
      const contentSessionCollectionIdentifiers = contentSessionCollection.map(
        contentSessionItem => this.getContentSessionIdentifier(contentSessionItem)!
      );
      const contentSessionsToAdd = contentSessions.filter(contentSessionItem => {
        const contentSessionIdentifier = this.getContentSessionIdentifier(contentSessionItem);
        if (contentSessionCollectionIdentifiers.includes(contentSessionIdentifier)) {
          return false;
        }
        contentSessionCollectionIdentifiers.push(contentSessionIdentifier);
        return true;
      });
      return [...contentSessionsToAdd, ...contentSessionCollection];
    }
    return contentSessionCollection;
  }
}
