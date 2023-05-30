import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { INews, NewNews } from '../news.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INews for edit and NewNewsFormGroupInput for create.
 */
type NewsFormGroupInput = INews | PartialWithRequiredKeyOf<NewNews>;

type NewsFormDefaults = Pick<NewNews, 'id'>;

type NewsFormGroupContent = {
  id: FormControl<INews['id'] | NewNews['id']>;
  tilte: FormControl<INews['tilte']>;
  tilteKo: FormControl<INews['tilteKo']>;
  description: FormControl<INews['description']>;
  descriptionKo: FormControl<INews['descriptionKo']>;
  content: FormControl<INews['content']>;
  contentKo: FormControl<INews['contentKo']>;
  newsCategory: FormControl<INews['newsCategory']>;
};

export type NewsFormGroup = FormGroup<NewsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class NewsFormService {
  createNewsFormGroup(news: NewsFormGroupInput = { id: null }): NewsFormGroup {
    const newsRawValue = {
      ...this.getFormDefaults(),
      ...news,
    };
    return new FormGroup<NewsFormGroupContent>({
      id: new FormControl(
        { value: newsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      tilte: new FormControl(newsRawValue.tilte, {
        validators: [Validators.required],
      }),
      tilteKo: new FormControl(newsRawValue.tilteKo, {
        validators: [Validators.required],
      }),
      description: new FormControl(newsRawValue.description, {
        validators: [Validators.required],
      }),
      descriptionKo: new FormControl(newsRawValue.descriptionKo, {
        validators: [Validators.required],
      }),
      content: new FormControl(newsRawValue.content, {
        validators: [Validators.required],
      }),
      contentKo: new FormControl(newsRawValue.contentKo, {
        validators: [Validators.required],
      }),
      newsCategory: new FormControl(newsRawValue.newsCategory),
    });
  }

  getNews(form: NewsFormGroup): INews | NewNews {
    return form.getRawValue() as INews | NewNews;
  }

  resetForm(form: NewsFormGroup, news: NewsFormGroupInput): void {
    const newsRawValue = { ...this.getFormDefaults(), ...news };
    form.reset(
      {
        ...newsRawValue,
        id: { value: newsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): NewsFormDefaults {
    return {
      id: null,
    };
  }
}
