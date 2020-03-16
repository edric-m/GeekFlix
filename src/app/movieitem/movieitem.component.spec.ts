import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieitemComponent } from './movieitem.component';

describe('MovieitemComponent', () => {
  let component: MovieitemComponent;
  let fixture: ComponentFixture<MovieitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //test case when image not loaded that it should fill the same space and replace image

  //test case when title not loaded it should fill the same space

  //test case when description not loaded it should fill the same space

  //test for any missing fields

  //test space is removed from title when card is clicked

  //test '/' is removed from title when card is clicked
});
