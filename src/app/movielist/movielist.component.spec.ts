import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovielistComponent } from './movielist.component';

describe('MovielistComponent', () => {
  let component: MovielistComponent;
  let fixture: ComponentFixture<MovielistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovielistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovielistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //test when movie count is less than 20

  //test when no data is loaded

  //test when alignment is off?

  //test that element is of a specific size
});
