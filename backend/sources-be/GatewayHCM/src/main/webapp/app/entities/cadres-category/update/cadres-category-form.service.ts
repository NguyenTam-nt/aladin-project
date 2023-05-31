import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICadresCategory, NewCadresCategory } from '../cadres-category.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICadresCategory for edit and NewCadresCategoryFormGroupInput for create.
 */
type CadresCategoryFormGroupInput = ICadresCategory | PartialWithRequiredKeyOf<NewCadresCategory>;

type CadresCategoryFormDefaults = Pick<NewCadresCategory, 'id'>;

type CadresCategoryFormGroupContent = {
  id: FormControl<ICadresCategory['id'] | NewCadresCategory['id']>;
  name: FormControl<ICadresCategory['name']>;
  nameKo: FormControl<ICadresCategory['nameKo']>;
  cadres: FormControl<ICadresCategory['cadres']>;
};

export type CadresCategoryFormGroup = FormGroup<CadresCategoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CadresCategoryFormService {
  createCadresCategoryFormGroup(cadresCategory: CadresCategoryFormGroupInput = { id: null }): CadresCategoryFormGroup {
    const cadresCategoryRawValue = {
      ...this.getFormDefaults(),
      ...cadresCategory,
    };
    return new FormGroup<CadresCategoryFormGroupContent>({
      id: new FormControl(
        { value: cadresCategoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(cadresCategoryRawValue.name, {
        validators: [Validators.required],
      }),
      nameKo: new FormControl(cadresCategoryRawValue.nameKo, {
        validators: [Validators.required],
      }),
      cadres: new FormControl(cadresCategoryRawValue.cadres),
    });
  }

  getCadresCategory(form: CadresCategoryFormGroup): ICadresCategory | NewCadresCategory {
    return form.getRawValue() as ICadresCategory | NewCadresCategory;
  }

  resetForm(form: CadresCategoryFormGroup, cadresCategory: CadresCategoryFormGroupInput): void {
    const cadresCategoryRawValue = { ...this.getFormDefaults(), ...cadresCategory };
    form.reset(
      {
        ...cadresCategoryRawValue,
        id: { value: cadresCategoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CadresCategoryFormDefaults {
    return {
      id: null,
    };
  }
}
