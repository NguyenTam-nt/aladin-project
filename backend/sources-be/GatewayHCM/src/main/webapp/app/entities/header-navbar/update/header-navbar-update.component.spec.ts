import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { HeaderNavbarFormService } from './header-navbar-form.service';
import { HeaderNavbarService } from '../service/header-navbar.service';
import { IHeaderNavbar } from '../header-navbar.model';

import { HeaderNavbarUpdateComponent } from './header-navbar-update.component';

describe('HeaderNavbar Management Update Component', () => {
  let comp: HeaderNavbarUpdateComponent;
  let fixture: ComponentFixture<HeaderNavbarUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let headerNavbarFormService: HeaderNavbarFormService;
  let headerNavbarService: HeaderNavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [HeaderNavbarUpdateComponent],
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
      .overrideTemplate(HeaderNavbarUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HeaderNavbarUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    headerNavbarFormService = TestBed.inject(HeaderNavbarFormService);
    headerNavbarService = TestBed.inject(HeaderNavbarService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const headerNavbar: IHeaderNavbar = { id: 456 };

      activatedRoute.data = of({ headerNavbar });
      comp.ngOnInit();

      expect(comp.headerNavbar).toEqual(headerNavbar);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHeaderNavbar>>();
      const headerNavbar = { id: 123 };
      jest.spyOn(headerNavbarFormService, 'getHeaderNavbar').mockReturnValue(headerNavbar);
      jest.spyOn(headerNavbarService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ headerNavbar });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: headerNavbar }));
      saveSubject.complete();

      // THEN
      expect(headerNavbarFormService.getHeaderNavbar).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(headerNavbarService.update).toHaveBeenCalledWith(expect.objectContaining(headerNavbar));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHeaderNavbar>>();
      const headerNavbar = { id: 123 };
      jest.spyOn(headerNavbarFormService, 'getHeaderNavbar').mockReturnValue({ id: null });
      jest.spyOn(headerNavbarService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ headerNavbar: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: headerNavbar }));
      saveSubject.complete();

      // THEN
      expect(headerNavbarFormService.getHeaderNavbar).toHaveBeenCalled();
      expect(headerNavbarService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHeaderNavbar>>();
      const headerNavbar = { id: 123 };
      jest.spyOn(headerNavbarService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ headerNavbar });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(headerNavbarService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
