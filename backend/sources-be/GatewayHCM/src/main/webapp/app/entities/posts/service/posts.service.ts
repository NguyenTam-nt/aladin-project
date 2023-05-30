import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPosts, NewPosts } from '../posts.model';

export type PartialUpdatePosts = Partial<IPosts> & Pick<IPosts, 'id'>;

export type EntityResponseType = HttpResponse<IPosts>;
export type EntityArrayResponseType = HttpResponse<IPosts[]>;

@Injectable({ providedIn: 'root' })
export class PostsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/posts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(posts: NewPosts): Observable<EntityResponseType> {
    return this.http.post<IPosts>(this.resourceUrl, posts, { observe: 'response' });
  }

  update(posts: IPosts): Observable<EntityResponseType> {
    return this.http.put<IPosts>(`${this.resourceUrl}/${this.getPostsIdentifier(posts)}`, posts, { observe: 'response' });
  }

  partialUpdate(posts: PartialUpdatePosts): Observable<EntityResponseType> {
    return this.http.patch<IPosts>(`${this.resourceUrl}/${this.getPostsIdentifier(posts)}`, posts, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPosts>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPosts[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPostsIdentifier(posts: Pick<IPosts, 'id'>): number {
    return posts.id;
  }

  comparePosts(o1: Pick<IPosts, 'id'> | null, o2: Pick<IPosts, 'id'> | null): boolean {
    return o1 && o2 ? this.getPostsIdentifier(o1) === this.getPostsIdentifier(o2) : o1 === o2;
  }

  addPostsToCollectionIfMissing<Type extends Pick<IPosts, 'id'>>(
    postsCollection: Type[],
    ...postsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const posts: Type[] = postsToCheck.filter(isPresent);
    if (posts.length > 0) {
      const postsCollectionIdentifiers = postsCollection.map(postsItem => this.getPostsIdentifier(postsItem)!);
      const postsToAdd = posts.filter(postsItem => {
        const postsIdentifier = this.getPostsIdentifier(postsItem);
        if (postsCollectionIdentifiers.includes(postsIdentifier)) {
          return false;
        }
        postsCollectionIdentifiers.push(postsIdentifier);
        return true;
      });
      return [...postsToAdd, ...postsCollection];
    }
    return postsCollection;
  }
}
