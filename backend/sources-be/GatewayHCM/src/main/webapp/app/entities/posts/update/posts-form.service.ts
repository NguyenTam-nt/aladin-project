import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPosts, NewPosts } from '../posts.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPosts for edit and NewPostsFormGroupInput for create.
 */
type PostsFormGroupInput = IPosts | PartialWithRequiredKeyOf<NewPosts>;

type PostsFormDefaults = Pick<NewPosts, 'id' | 'outstanding'>;

type PostsFormGroupContent = {
  id: FormControl<IPosts['id'] | NewPosts['id']>;
  title: FormControl<IPosts['title']>;
  titleKo: FormControl<IPosts['titleKo']>;
  description: FormControl<IPosts['description']>;
  descriptionKo: FormControl<IPosts['descriptionKo']>;
  image: FormControl<IPosts['image']>;
  link: FormControl<IPosts['link']>;
  outstanding: FormControl<IPosts['outstanding']>;
};

export type PostsFormGroup = FormGroup<PostsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PostsFormService {
  createPostsFormGroup(posts: PostsFormGroupInput = { id: null }): PostsFormGroup {
    const postsRawValue = {
      ...this.getFormDefaults(),
      ...posts,
    };
    return new FormGroup<PostsFormGroupContent>({
      id: new FormControl(
        { value: postsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      title: new FormControl(postsRawValue.title, {
        validators: [Validators.required],
      }),
      titleKo: new FormControl(postsRawValue.titleKo, {
        validators: [Validators.required],
      }),
      description: new FormControl(postsRawValue.description, {
        validators: [Validators.required],
      }),
      descriptionKo: new FormControl(postsRawValue.descriptionKo, {
        validators: [Validators.required],
      }),
      image: new FormControl(postsRawValue.image, {
        validators: [Validators.required],
      }),
      link: new FormControl(postsRawValue.link, {
        validators: [Validators.required],
      }),
      outstanding: new FormControl(postsRawValue.outstanding),
    });
  }

  getPosts(form: PostsFormGroup): IPosts | NewPosts {
    return form.getRawValue() as IPosts | NewPosts;
  }

  resetForm(form: PostsFormGroup, posts: PostsFormGroupInput): void {
    const postsRawValue = { ...this.getFormDefaults(), ...posts };
    form.reset(
      {
        ...postsRawValue,
        id: { value: postsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PostsFormDefaults {
    return {
      id: null,
      outstanding: false,
    };
  }
}
