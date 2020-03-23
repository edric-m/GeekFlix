import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviepageComponent } from './moviepage.component';
import { GetlistService } from '../getlist.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

describe('MoviepageComponent', () => {
  let component: MoviepageComponent;
  let fixture: ComponentFixture<MoviepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ MoviepageComponent ],
      providers: [ GetlistService ]
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
