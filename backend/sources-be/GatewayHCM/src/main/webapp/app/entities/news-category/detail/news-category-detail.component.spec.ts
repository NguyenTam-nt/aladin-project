import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NewsCategoryDetailComponent } from './news-category-detail.component';

describe('NewsCategory Management Detail Component', () => {
  let comp: NewsCategoryDetailComponent;
  let fixture: ComponentFixture<NewsCategoryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsCategoryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ newsCategory: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(NewsCategoryDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(NewsCategoryDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load newsCategory on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.newsCategory).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
