import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IHistory, NewHistory } from '../history.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IHistory for edit and NewHistoryFormGroupInput for create.
 */
type HistoryFormGroupInput = IHistory | PartialWithRequiredKeyOf<NewHistory>;

type HistoryFormDefaults = Pick<NewHistory, 'id'>;

type HistoryFormGroupContent = {
  id: FormControl<IHistory['id'] | NewHistory['id']>;
  year: FormControl<IHistory['year']>;
  image: FormControl<IHistory['image']>;
  description: FormControl<IHistory['description']>;
  descriptionKo: FormControl<IHistory['descriptionKo']>;
};

export type HistoryFormGroup = FormGroup<HistoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class HistoryFormService {
  createHistoryFormGroup(history: HistoryFormGroupInput = { id: null }): HistoryFormGroup {
    const historyRawValue = {
      ...this.getFormDefaults(),
      ...history,
    };
    return new FormGroup<HistoryFormGroupContent>({
      id: new FormControl(
        { value: historyRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      year: new FormControl(historyRawValue.year, {
        validators: [Validators.required],
      }),
      image: new FormControl(historyRawValue.image, {
        validators: [Validators.required],
      }),
      description: new FormControl(historyRawValue.description, {
        validators: [Validators.required],
      }),
      descriptionKo: new FormControl(historyRawValue.descriptionKo, {
        validators: [Validators.required],
      }),
    });
  }

  getHistory(form: HistoryFormGroup): IHistory | NewHistory {
    return form.getRawValue() as IHistory | NewHistory;
  }

  resetForm(form: HistoryFormGroup, history: HistoryFormGroupInput): void {
    const historyRawValue = { ...this.getFormDefaults(), ...history };
    form.reset(
      {
        ...historyRawValue,
        id: { value: historyRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): HistoryFormDefaults {
    return {
      id: null,
    };
  }
}
