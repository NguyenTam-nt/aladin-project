import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HeaderNavbarDetailComponent } from './header-navbar-detail.component';

describe('HeaderNavbar Management Detail Component', () => {
  let comp: HeaderNavbarDetailComponent;
  let fixture: ComponentFixture<HeaderNavbarDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderNavbarDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ headerNavbar: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(HeaderNavbarDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(HeaderNavbarDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load headerNavbar on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.headerNavbar).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
