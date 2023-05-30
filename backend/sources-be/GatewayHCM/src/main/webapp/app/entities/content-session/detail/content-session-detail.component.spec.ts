import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ContentSessionDetailComponent } from './content-session-detail.component';

describe('ContentSession Management Detail Component', () => {
  let comp: ContentSessionDetailComponent;
  let fixture: ComponentFixture<ContentSessionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentSessionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ contentSession: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ContentSessionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ContentSessionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load contentSession on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.contentSession).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
