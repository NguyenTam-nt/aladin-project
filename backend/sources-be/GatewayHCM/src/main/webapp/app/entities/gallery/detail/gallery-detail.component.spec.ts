import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GalleryDetailComponent } from './gallery-detail.component';

describe('Gallery Management Detail Component', () => {
  let comp: GalleryDetailComponent;
  let fixture: ComponentFixture<GalleryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ gallery: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(GalleryDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(GalleryDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load gallery on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.gallery).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
