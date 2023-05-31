import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICadres, NewCadres } from '../cadres.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICadres for edit and NewCadresFormGroupInput for create.
 */
type CadresFormGroupInput = ICadres | PartialWithRequiredKeyOf<NewCadres>;

type CadresFormDefaults = Pick<NewCadres, 'id'>;

type CadresFormGroupContent = {
  id: FormControl<ICadres['id'] | NewCadres['id']>;
  fullname: FormControl<ICadres['fullname']>;
  fullnameKo: FormControl<ICadres['fullnameKo']>;
  position: FormControl<ICadres['position']>;
  positionKo: FormControl<ICadres['positionKo']>;
  email: FormControl<ICadres['email']>;
  major: FormControl<ICadres['major']>;
  majorKo: FormControl<ICadres['majorKo']>;
  workResponsibility: FormControl<ICadres['workResponsibility']>;
  workResponsibilityKo: FormControl<ICadres['workResponsibilityKo']>;
  title: FormControl<ICadres['title']>;
  titleKo: FormControl<ICadres['titleKo']>;
  content: FormControl<ICadres['content']>;
  contentKo: FormControl<ICadres['contentKo']>;
};

export type CadresFormGroup = FormGroup<CadresFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CadresFormService {
  createCadresFormGroup(cadres: CadresFormGroupInput = { id: null }): CadresFormGroup {
    const cadresRawValue = {
      ...this.getFormDefaults(),
      ...cadres,
    };
    return new FormGroup<CadresFormGroupContent>({
      id: new FormControl(
        { value: cadresRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      fullname: new FormControl(cadresRawValue.fullname, {
        validators: [Validators.required],
      }),
      fullnameKo: new FormControl(cadresRawValue.fullnameKo, {
        validators: [Validators.required],
      }),
      position: new FormControl(cadresRawValue.position, {
        validators: [Validators.required],
      }),
      positionKo: new FormControl(cadresRawValue.positionKo, {
        validators: [Validators.required],
      }),
      email: new FormControl(cadresRawValue.email, {
        validators: [Validators.required, Validators.pattern('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\\\.[A-Z]{2,6}$')],
      }),
      major: new FormControl(cadresRawValue.major, {
        validators: [Validators.required],
      }),
      majorKo: new FormControl(cadresRawValue.majorKo, {
        validators: [Validators.required],
      }),
      workResponsibility: new FormControl(cadresRawValue.workResponsibility, {
        validators: [Validators.required],
      }),
      workResponsibilityKo: new FormControl(cadresRawValue.workResponsibilityKo, {
        validators: [Validators.required],
      }),
      title: new FormControl(cadresRawValue.title, {
        validators: [Validators.required],
      }),
      titleKo: new FormControl(cadresRawValue.titleKo, {
        validators: [Validators.required],
      }),
      content: new FormControl(cadresRawValue.content, {
        validators: [Validators.required],
      }),
      contentKo: new FormControl(cadresRawValue.contentKo, {
        validators: [Validators.required],
      }),
    });
  }

  getCadres(form: CadresFormGroup): ICadres | NewCadres {
    return form.getRawValue() as ICadres | NewCadres;
  }

  resetForm(form: CadresFormGroup, cadres: CadresFormGroupInput): void {
    const cadresRawValue = { ...this.getFormDefaults(), ...cadres };
    form.reset(
      {
        ...cadresRawValue,
        id: { value: cadresRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CadresFormDefaults {
    return {
      id: null,
    };
  }
}
