import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IGallery, NewGallery } from '../gallery.model';

export type PartialUpdateGallery = Partial<IGallery> & Pick<IGallery, 'id'>;

export type EntityResponseType = HttpResponse<IGallery>;
export type EntityArrayResponseType = HttpResponse<IGallery[]>;

@Injectable({ providedIn: 'root' })
export class GalleryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/galleries');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(gallery: NewGallery): Observable<EntityResponseType> {
    return this.http.post<IGallery>(this.resourceUrl, gallery, { observe: 'response' });
  }

  update(gallery: IGallery): Observable<EntityResponseType> {
    return this.http.put<IGallery>(`${this.resourceUrl}/${this.getGalleryIdentifier(gallery)}`, gallery, { observe: 'response' });
  }

  partialUpdate(gallery: PartialUpdateGallery): Observable<EntityResponseType> {
    return this.http.patch<IGallery>(`${this.resourceUrl}/${this.getGalleryIdentifier(gallery)}`, gallery, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGallery>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGallery[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getGalleryIdentifier(gallery: Pick<IGallery, 'id'>): number {
    return gallery.id;
  }

  compareGallery(o1: Pick<IGallery, 'id'> | null, o2: Pick<IGallery, 'id'> | null): boolean {
    return o1 && o2 ? this.getGalleryIdentifier(o1) === this.getGalleryIdentifier(o2) : o1 === o2;
  }

  addGalleryToCollectionIfMissing<Type extends Pick<IGallery, 'id'>>(
    galleryCollection: Type[],
    ...galleriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const galleries: Type[] = galleriesToCheck.filter(isPresent);
    if (galleries.length > 0) {
      const galleryCollectionIdentifiers = galleryCollection.map(galleryItem => this.getGalleryIdentifier(galleryItem)!);
      const galleriesToAdd = galleries.filter(galleryItem => {
        const galleryIdentifier = this.getGalleryIdentifier(galleryItem);
        if (galleryCollectionIdentifiers.includes(galleryIdentifier)) {
          return false;
        }
        galleryCollectionIdentifiers.push(galleryIdentifier);
        return true;
      });
      return [...galleriesToAdd, ...galleryCollection];
    }
    return galleryCollection;
  }
}
