import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IContentSession, NewContentSession } from '../content-session.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IContentSession for edit and NewContentSessionFormGroupInput for create.
 */
type ContentSessionFormGroupInput = IContentSession | PartialWithRequiredKeyOf<NewContentSession>;

type ContentSessionFormDefaults = Pick<NewContentSession, 'id'>;

type ContentSessionFormGroupContent = {
  id: FormControl<IContentSession['id'] | NewContentSession['id']>;
  type: FormControl<IContentSession['type']>;
  category: FormControl<IContentSession['category']>;
  categoryKo: FormControl<IContentSession['categoryKo']>;
  tilte: FormControl<IContentSession['tilte']>;
  tilteKo: FormControl<IContentSession['tilteKo']>;
  content: FormControl<IContentSession['content']>;
  contentKo: FormControl<IContentSession['contentKo']>;
};

export type ContentSessionFormGroup = FormGroup<ContentSessionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ContentSessionFormService {
  createContentSessionFormGroup(contentSession: ContentSessionFormGroupInput = { id: null }): ContentSessionFormGroup {
    const contentSessionRawValue = {
      ...this.getFormDefaults(),
      ...contentSession,
    };
    return new FormGroup<ContentSessionFormGroupContent>({
      id: new FormControl(
        { value: contentSessionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      type: new FormControl(contentSessionRawValue.type, {
        validators: [Validators.required],
      }),
      category: new FormControl(contentSessionRawValue.category, {
        validators: [Validators.required],
      }),
      categoryKo: new FormControl(contentSessionRawValue.categoryKo, {
        validators: [Validators.required],
      }),
      tilte: new FormControl(contentSessionRawValue.tilte, {
        validators: [Validators.required],
      }),
      tilteKo: new FormControl(contentSessionRawValue.tilteKo, {
        validators: [Validators.required],
      }),
      content: new FormControl(contentSessionRawValue.content, {
        validators: [Validators.required],
      }),
      contentKo: new FormControl(contentSessionRawValue.contentKo, {
        validators: [Validators.required],
      }),
    });
  }

  getContentSession(form: ContentSessionFormGroup): IContentSession | NewContentSession {
    return form.getRawValue() as IContentSession | NewContentSession;
  }

  resetForm(form: ContentSessionFormGroup, contentSession: ContentSessionFormGroupInput): void {
    const contentSessionRawValue = { ...this.getFormDefaults(), ...contentSession };
    form.reset(
      {
        ...contentSessionRawValue,
        id: { value: contentSessionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ContentSessionFormDefaults {
    return {
      id: null,
    };
  }
}
