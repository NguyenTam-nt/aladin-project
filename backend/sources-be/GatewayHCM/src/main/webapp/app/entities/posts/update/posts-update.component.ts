import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { PostsFormService, PostsFormGroup } from './posts-form.service';
import { IPosts } from '../posts.model';
import { PostsService } from '../service/posts.service';

@Component({
  selector: 'jhi-posts-update',
  templateUrl: './posts-update.component.html',
})
export class PostsUpdateComponent implements OnInit {
  isSaving = false;
  posts: IPosts | null = null;

  editForm: PostsFormGroup = this.postsFormService.createPostsFormGroup();

  constructor(
    protected postsService: PostsService,
    protected postsFormService: PostsFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ posts }) => {
      this.posts = posts;
      if (posts) {
        this.updateForm(posts);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const posts = this.postsFormService.getPosts(this.editForm);
    if (posts.id !== null) {
      this.subscribeToSaveResponse(this.postsService.update(posts));
    } else {
      this.subscribeToSaveResponse(this.postsService.create(posts));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPosts>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(posts: IPosts): void {
    this.posts = posts;
    this.postsFormService.resetForm(this.editForm, posts);
  }
}