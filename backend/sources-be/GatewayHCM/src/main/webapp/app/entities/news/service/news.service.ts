import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INews, NewNews } from '../news.model';

export type PartialUpdateNews = Partial<INews> & Pick<INews, 'id'>;

export type EntityResponseType = HttpResponse<INews>;
export type EntityArrayResponseType = HttpResponse<INews[]>;

@Injectable({ providedIn: 'root' })
export class NewsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/news');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(news: NewNews): Observable<EntityResponseType> {
    return this.http.post<INews>(this.resourceUrl, news, { observe: 'response' });
  }

  update(news: INews): Observable<EntityResponseType> {
    return this.http.put<INews>(`${this.resourceUrl}/${this.getNewsIdentifier(news)}`, news, { observe: 'response' });
  }

  partialUpdate(news: PartialUpdateNews): Observable<EntityResponseType> {
    return this.http.patch<INews>(`${this.resourceUrl}/${this.getNewsIdentifier(news)}`, news, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INews>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INews[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getNewsIdentifier(news: Pick<INews, 'id'>): number {
    return news.id;
  }

  compareNews(o1: Pick<INews, 'id'> | null, o2: Pick<INews, 'id'> | null): boolean {
    return o1 && o2 ? this.getNewsIdentifier(o1) === this.getNewsIdentifier(o2) : o1 === o2;
  }

  addNewsToCollectionIfMissing<Type extends Pick<INews, 'id'>>(
    newsCollection: Type[],
    ...newsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const news: Type[] = newsToCheck.filter(isPresent);
    if (news.length > 0) {
      const newsCollectionIdentifiers = newsCollection.map(newsItem => this.getNewsIdentifier(newsItem)!);
      const newsToAdd = news.filter(newsItem => {
        const newsIdentifier = this.getNewsIdentifier(newsItem);
        if (newsCollectionIdentifiers.includes(newsIdentifier)) {
          return false;
        }
        newsCollectionIdentifiers.push(newsIdentifier);
        return true;
      });
      return [...newsToAdd, ...newsCollection];
    }
    return newsCollection;
  }
}
