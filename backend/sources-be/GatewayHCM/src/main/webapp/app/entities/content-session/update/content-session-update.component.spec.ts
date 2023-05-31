import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ContentSessionFormService } from './content-session-form.service';
import { ContentSessionService } from '../service/content-session.service';
import { IContentSession } from '../content-session.model';

import { ContentSessionUpdateComponent } from './content-session-update.component';

describe('ContentSession Management Update Component', () => {
  let comp: ContentSessionUpdateComponent;
  let fixture: ComponentFixture<ContentSessionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let contentSessionFormService: ContentSessionFormService;
  let contentSessionService: ContentSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ContentSessionUpdateComponent],
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
      .overrideTemplate(ContentSessionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ContentSessionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    contentSessionFormService = TestBed.inject(ContentSessionFormService);
    contentSessionService = TestBed.inject(ContentSessionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const contentSession: IContentSession = { id: 456 };

      activatedRoute.data = of({ contentSession });
      comp.ngOnInit();

      expect(comp.contentSession).toEqual(contentSession);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContentSession>>();
      const contentSession = { id: 123 };
      jest.spyOn(contentSessionFormService, 'getContentSession').mockReturnValue(contentSession);
      jest.spyOn(contentSessionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contentSession });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contentSession }));
      saveSubject.complete();

      // THEN
      expect(contentSessionFormService.getContentSession).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(contentSessionService.update).toHaveBeenCalledWith(expect.objectContaining(contentSession));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContentSession>>();
      const contentSession = { id: 123 };
      jest.spyOn(contentSessionFormService, 'getContentSession').mockReturnValue({ id: null });
      jest.spyOn(contentSessionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contentSession: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contentSession }));
      saveSubject.complete();

      // THEN
      expect(contentSessionFormService.getContentSession).toHaveBeenCalled();
      expect(contentSessionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContentSession>>();
      const contentSession = { id: 123 };
      jest.spyOn(contentSessionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contentSession });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(contentSessionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
