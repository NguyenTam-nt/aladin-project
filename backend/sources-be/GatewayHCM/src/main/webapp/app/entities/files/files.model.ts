import { IContentSession } from 'app/entities/content-session/content-session.model';
import { INews } from 'app/entities/news/news.model';
import { ICadres } from 'app/entities/cadres/cadres.model';
import { ISubject } from 'app/entities/subject/subject.model';
import { IGallery } from 'app/entities/gallery/gallery.model';

export interface IFiles {
  id: number;
  objectId?: number | null;
  type?: string | null;
  link?: string | null;
  name?: string | null;
  contentSession?: Pick<IContentSession, 'id'> | null;
  news?: Pick<INews, 'id'> | null;
  cadres?: Pick<ICadres, 'id'> | null;
  subject?: Pick<ISubject, 'id'> | null;
  gallery?: Pick<IGallery, 'id'> | null;
}

export type NewFiles = Omit<IFiles, 'id'> & { id: null };
