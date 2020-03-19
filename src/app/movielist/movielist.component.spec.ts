import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovielistComponent } from './movielist.component';
import { GetlistService } from '../getlist.service';
import { HttpClientModule } from '@angular/common/http';

describe('MovielistComponent', () => {
  let component: MovielistComponent;
  let fixture: ComponentFixture<MovielistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ MovielistComponent ],
      providers: [ GetlistService ]
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

  // it('movielist should have exactly 20 items', () => {
  //   expect(component.movielist.length).toEqual(20);
  // });

  //test when movie count is less than 20

  //test when no data is loaded

  //test when alignment is off?

  //test that element is of a specific size
});
