import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PostsFormService } from './posts-form.service';
import { PostsService } from '../service/posts.service';
import { IPosts } from '../posts.model';

import { PostsUpdateComponent } from './posts-update.component';

describe('Posts Management Update Component', () => {
  let comp: PostsUpdateComponent;
  let fixture: ComponentFixture<PostsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let postsFormService: PostsFormService;
  let postsService: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PostsUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PostsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PostsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    postsFormService = TestBed.inject(PostsFormService);
    postsService = TestBed.inject(PostsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const posts: IPosts = { id: 456 };

      activatedRoute.data = of({ posts });
      comp.ngOnInit();

      expect(comp.posts).toEqual(posts);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPosts>>();
      const posts = { id: 123 };
      jest.spyOn(postsFormService, 'getPosts').mockReturnValue(posts);
      jest.spyOn(postsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ posts });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: posts }));
      saveSubject.complete();

      // THEN
      expect(postsFormService.getPosts).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(postsService.update).toHaveBeenCalledWith(expect.objectContaining(posts));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPosts>>();
      const posts = { id: 123 };
      jest.spyOn(postsFormService, 'getPosts').mockReturnValue({ id: null });
      jest.spyOn(postsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ posts: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: posts }));
      saveSubject.complete();

      // THEN
      expect(postsFormService.getPosts).toHaveBeenCalled();
      expect(postsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPosts>>();
      const posts = { id: 123 };
      jest.spyOn(postsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ posts });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(postsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
