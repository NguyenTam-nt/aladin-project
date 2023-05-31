import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IHeaderNavbar, NewHeaderNavbar } from '../header-navbar.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IHeaderNavbar for edit and NewHeaderNavbarFormGroupInput for create.
 */
type HeaderNavbarFormGroupInput = IHeaderNavbar | PartialWithRequiredKeyOf<NewHeaderNavbar>;

type HeaderNavbarFormDefaults = Pick<NewHeaderNavbar, 'id'>;

type HeaderNavbarFormGroupContent = {
  id: FormControl<IHeaderNavbar['id'] | NewHeaderNavbar['id']>;
  index: FormControl<IHeaderNavbar['index']>;
  name: FormControl<IHeaderNavbar['name']>;
  nameKo: FormControl<IHeaderNavbar['nameKo']>;
  link: FormControl<IHeaderNavbar['link']>;
  parent: FormControl<IHeaderNavbar['parent']>;
};

export type HeaderNavbarFormGroup = FormGroup<HeaderNavbarFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class HeaderNavbarFormService {
  createHeaderNavbarFormGroup(headerNavbar: HeaderNavbarFormGroupInput = { id: null }): HeaderNavbarFormGroup {
    const headerNavbarRawValue = {
      ...this.getFormDefaults(),
      ...headerNavbar,
    };
    return new FormGroup<HeaderNavbarFormGroupContent>({
      id: new FormControl(
        { value: headerNavbarRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      index: new FormControl(headerNavbarRawValue.index),
      name: new FormControl(headerNavbarRawValue.name),
      nameKo: new FormControl(headerNavbarRawValue.nameKo),
      link: new FormControl(headerNavbarRawValue.link),
      parent: new FormControl(headerNavbarRawValue.parent),
    });
  }

  getHeaderNavbar(form: HeaderNavbarFormGroup): IHeaderNavbar | NewHeaderNavbar {
    return form.getRawValue() as IHeaderNavbar | NewHeaderNavbar;
  }

  resetForm(form: HeaderNavbarFormGroup, headerNavbar: HeaderNavbarFormGroupInput): void {
    const headerNavbarRawValue = { ...this.getFormDefaults(), ...headerNavbar };
    form.reset(
      {
        ...headerNavbarRawValue,
        id: { value: headerNavbarRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): HeaderNavbarFormDefaults {
    return {
      id: null,
    };
  }
}
