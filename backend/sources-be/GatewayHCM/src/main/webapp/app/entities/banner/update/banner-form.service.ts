import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IBanner, NewBanner } from '../banner.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBanner for edit and NewBannerFormGroupInput for create.
 */
type BannerFormGroupInput = IBanner | PartialWithRequiredKeyOf<NewBanner>;

type BannerFormDefaults = Pick<NewBanner, 'id'>;

type BannerFormGroupContent = {
  id: FormControl<IBanner['id'] | NewBanner['id']>;
  type: FormControl<IBanner['type']>;
  link: FormControl<IBanner['link']>;
};

export type BannerFormGroup = FormGroup<BannerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BannerFormService {
  createBannerFormGroup(banner: BannerFormGroupInput = { id: null }): BannerFormGroup {
    const bannerRawValue = {
      ...this.getFormDefaults(),
      ...banner,
    };
    return new FormGroup<BannerFormGroupContent>({
      id: new FormControl(
        { value: bannerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      type: new FormControl(bannerRawValue.type, {
        validators: [Validators.required],
      }),
      link: new FormControl(bannerRawValue.link, {
        validators: [Validators.required],
      }),
    });
  }

  getBanner(form: BannerFormGroup): IBanner | NewBanner {
    return form.getRawValue() as IBanner | NewBanner;
  }

  resetForm(form: BannerFormGroup, banner: BannerFormGroupInput): void {
    const bannerRawValue = { ...this.getFormDefaults(), ...banner };
    form.reset(
      {
        ...bannerRawValue,
        id: { value: bannerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): BannerFormDefaults {
    return {
      id: null,
    };
  }
}
