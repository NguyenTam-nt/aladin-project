import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CadresDetailComponent } from './cadres-detail.component';

describe('Cadres Management Detail Component', () => {
  let comp: CadresDetailComponent;
  let fixture: ComponentFixture<CadresDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadresDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ cadres: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CadresDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CadresDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cadres on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.cadres).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
