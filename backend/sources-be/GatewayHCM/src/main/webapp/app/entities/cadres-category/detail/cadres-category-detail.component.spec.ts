import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CadresCategoryDetailComponent } from './cadres-category-detail.component';

describe('CadresCategory Management Detail Component', () => {
  let comp: CadresCategoryDetailComponent;
  let fixture: ComponentFixture<CadresCategoryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadresCategoryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ cadresCategory: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CadresCategoryDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CadresCategoryDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cadresCategory on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.cadresCategory).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
