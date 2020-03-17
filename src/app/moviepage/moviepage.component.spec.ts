import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviepageComponent } from './moviepage.component';

describe('MoviepageComponent', () => {
  let component: MoviepageComponent;
  let fixture: ComponentFixture<MoviepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //test data loaded

  //test placeholders when no data loaded

  //test 'related' title disappears when no data loaded

  //test that movie id is removed from local storage if no emotions exist
});
