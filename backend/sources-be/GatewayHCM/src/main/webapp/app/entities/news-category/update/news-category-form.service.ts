import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { INewsCategory, NewNewsCategory } from '../news-category.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INewsCategory for edit and NewNewsCategoryFormGroupInput for create.
 */
type NewsCategoryFormGroupInput = INewsCategory | PartialWithRequiredKeyOf<NewNewsCategory>;

type NewsCategoryFormDefaults = Pick<NewNewsCategory, 'id'>;

type NewsCategoryFormGroupContent = {
  id: FormControl<INewsCategory['id'] | NewNewsCategory['id']>;
  name: FormControl<INewsCategory['name']>;
  nameKo: FormControl<INewsCategory['nameKo']>;
};

export type NewsCategoryFormGroup = FormGroup<NewsCategoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class NewsCategoryFormService {
  createNewsCategoryFormGroup(newsCategory: NewsCategoryFormGroupInput = { id: null }): NewsCategoryFormGroup {
    const newsCategoryRawValue = {
      ...this.getFormDefaults(),
      ...newsCategory,
    };
    return new FormGroup<NewsCategoryFormGroupContent>({
      id: new FormControl(
        { value: newsCategoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(newsCategoryRawValue.name),
      nameKo: new FormControl(newsCategoryRawValue.nameKo),
    });
  }

  getNewsCategory(form: NewsCategoryFormGroup): INewsCategory | NewNewsCategory {
    return form.getRawValue() as INewsCategory | NewNewsCategory;
  }

  resetForm(form: NewsCategoryFormGroup, newsCategory: NewsCategoryFormGroupInput): void {
    const newsCategoryRawValue = { ...this.getFormDefaults(), ...newsCategory };
    form.reset(
      {
        ...newsCategoryRawValue,
        id: { value: newsCategoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): NewsCategoryFormDefaults {
    return {
      id: null,
    };
  }
}
