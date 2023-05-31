import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFiles, NewFiles } from '../files.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFiles for edit and NewFilesFormGroupInput for create.
 */
type FilesFormGroupInput = IFiles | PartialWithRequiredKeyOf<NewFiles>;

type FilesFormDefaults = Pick<NewFiles, 'id'>;

type FilesFormGroupContent = {
  id: FormControl<IFiles['id'] | NewFiles['id']>;
  objectId: FormControl<IFiles['objectId']>;
  type: FormControl<IFiles['type']>;
  link: FormControl<IFiles['link']>;
  name: FormControl<IFiles['name']>;
  contentSession: FormControl<IFiles['contentSession']>;
  news: FormControl<IFiles['news']>;
  cadres: FormControl<IFiles['cadres']>;
  subject: FormControl<IFiles['subject']>;
  gallery: FormControl<IFiles['gallery']>;
};

export type FilesFormGroup = FormGroup<FilesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FilesFormService {
  createFilesFormGroup(files: FilesFormGroupInput = { id: null }): FilesFormGroup {
    const filesRawValue = {
      ...this.getFormDefaults(),
      ...files,
    };
    return new FormGroup<FilesFormGroupContent>({
      id: new FormControl(
        { value: filesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      objectId: new FormControl(filesRawValue.objectId, {
        validators: [Validators.required],
      }),
      type: new FormControl(filesRawValue.type),
      link: new FormControl(filesRawValue.link, {
        validators: [Validators.required],
      }),
      name: new FormControl(filesRawValue.name),
      contentSession: new FormControl(filesRawValue.contentSession),
      news: new FormControl(filesRawValue.news),
      cadres: new FormControl(filesRawValue.cadres),
      subject: new FormControl(filesRawValue.subject),
      gallery: new FormControl(filesRawValue.gallery),
    });
  }

  getFiles(form: FilesFormGroup): IFiles | NewFiles {
    return form.getRawValue() as IFiles | NewFiles;
  }

  resetForm(form: FilesFormGroup, files: FilesFormGroupInput): void {
    const filesRawValue = { ...this.getFormDefaults(), ...files };
    form.reset(
      {
        ...filesRawValue,
        id: { value: filesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FilesFormDefaults {
    return {
      id: null,
    };
  }
}
