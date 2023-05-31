import { GalleryType } from 'app/entities/enumerations/gallery-type.model';

export interface IGallery {
  id: number;
  nameKo?: string | null;
  type?: GalleryType | null;
}

export type NewGallery = Omit<IGallery, 'id'> & { id: null };
