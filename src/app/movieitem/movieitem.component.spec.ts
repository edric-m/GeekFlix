import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieitemComponent } from './movieitem.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MovieitemComponent', () => {
  let component: MovieitemComponent;
  let fixture: ComponentFixture<MovieitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
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

  it('should show the \'delete\' button only when it is moused over', () => {
    //--assemble
    expect(component.hovered).toBe(false);
    //--act
    component.hasMouseFocus(true);
    //--assert
    expect(component.hovered).toBe(true);
  });

  //test case when image not loaded that it should fill the same space and replace image

  //test case when title not loaded it should fill the same space

  //test case when description not loaded it should fill the same space

  //test for any missing fields

  //test space is removed from title when card is clicked

  //test '/' is removed from title when card is clicked
});
