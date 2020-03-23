import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovielistComponent } from './movielist.component';
import { GetlistService } from '../getlist.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
//import { ignoreElements } from 'rxjs/operators';
//import { Injectable } from '@angular/core';
import { Movie } from '../movie.model';
//import { HttpClient } from '@angular/common/http';
import fakePageResponseData from '../fakeList.data';

describe('MovielistComponent', () => {
  let component: MovielistComponent;
  let fixture: ComponentFixture<MovielistComponent>;
  let getlistService: GetlistService;
  let response: Movie[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ MovielistComponent ],
      //providers: [ { provide: GetlistService, useClass: MockListService } ] //overwrite service with mocked service
      providers: [ GetlistService ] //online resources say to also provide dependancies of dependancies? //, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovielistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    //inject the serve class to the component instance, can use the mocked service
    getlistService = TestBed.get(GetlistService);
    response = fakePageResponseData;
  });

  it('should create', () => {
    expect(component).toBeTruthy(); //does this call ngOnInit()?
  });

  it('listService.getPage() returns a list of 20', () => {
    spyOn(getlistService,'getPage').and.returnValue(of({ totalResults: response.length, results: response}));
    component.ngOnInit();
    expect(component.movielist.length).toEqual(20);
    expect(component.totalResults).toEqual(20);
  });

  //when getpage returns list of 0, return 20
  it('ngOnInit sets movielist with a list containing 20 items when listservice.getPage returns 0 items', () => {
    let responseEmpty = []; //why do we need to reinitialise? when beforeEach resets it?
    spyOn(getlistService,'getPage').and.returnValue(of({ totalResults: responseEmpty.length, results: responseEmpty}));
    component.ngOnInit();
    expect(component.movielist.length).toEqual(20);
  });

  //when getpage returns list of 1, return 20

  //ngOnInit always results in a list of 20

  //ngOnInit removes an item from the list

  //test when movie count is less than 20

  //test when no data is loaded
});
