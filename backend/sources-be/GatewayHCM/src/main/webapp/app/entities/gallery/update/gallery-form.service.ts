import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IGallery, NewGallery } from '../gallery.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGallery for edit and NewGalleryFormGroupInput for create.
 */
type GalleryFormGroupInput = IGallery | PartialWithRequiredKeyOf<NewGallery>;

type GalleryFormDefaults = Pick<NewGallery, 'id'>;

type GalleryFormGroupContent = {
  id: FormControl<IGallery['id'] | NewGallery['id']>;
  nameKo: FormControl<IGallery['nameKo']>;
  type: FormControl<IGallery['type']>;
};

export type GalleryFormGroup = FormGroup<GalleryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GalleryFormService {
  createGalleryFormGroup(gallery: GalleryFormGroupInput = { id: null }): GalleryFormGroup {
    const galleryRawValue = {
      ...this.getFormDefaults(),
      ...gallery,
    };
    return new FormGroup<GalleryFormGroupContent>({
      id: new FormControl(
        { value: galleryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nameKo: new FormControl(galleryRawValue.nameKo, {
        validators: [Validators.required],
      }),
      type: new FormControl(galleryRawValue.type),
    });
  }

  getGallery(form: GalleryFormGroup): IGallery | NewGallery {
    return form.getRawValue() as IGallery | NewGallery;
  }

  resetForm(form: GalleryFormGroup, gallery: GalleryFormGroupInput): void {
    const galleryRawValue = { ...this.getFormDefaults(), ...gallery };
    form.reset(
      {
        ...galleryRawValue,
        id: { value: galleryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): GalleryFormDefaults {
    return {
      id: null,
    };
  }
}
