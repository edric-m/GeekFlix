import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovielistComponent } from './movielist.component';
import { GetlistService } from '../getlist.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { defer, of } from 'rxjs';
//import { ignoreElements } from 'rxjs/operators';
//import { Injectable } from '@angular/core';
import { Movie } from '../movie.model';
//import { HttpClient } from '@angular/common/http';
import fakePageResponseData from '../fakeList.data';

export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

const listServiceStub = {
  getPage(page: number) {
    return fakeAsyncResponse({totalResults: fakePageResponseData.length, results: fakePageResponseData});
  }
}

describe('MovielistComponent', () => {
  let component: MovielistComponent;
  let fixture: ComponentFixture<MovielistComponent>;
  let getlistService: GetlistService;
  //let response: Movie[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ MovielistComponent ],
      providers: [ { provide: GetlistService, useValue: listServiceStub } ] //overwrite service with mocked service
      //providers: [ GetlistService ] //online resources say to also provide dependancies of dependancies? //, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovielistComponent);
    component = fixture.componentInstance;
  
    //inject the serve class to the component instance, can use the mocked service
    getlistService = TestBed.get(GetlistService);
    //response = fakePageResponseData;
    fixture.detectChanges();
  });

  //behavior of the component from the users point of view
  //we asserst specific things to be true if that behavior were implemented

  xit('20 movies should be displayed even when some movies have been removed from the list', () => {
    fixture.detectChanges(); //ngOnInit will be called as part of this function
    
  });

  //see a list of movies from the api
  //-there is a list filled with movie information
  
  //delete a movie from the list
  //-the movie is part of a deleted list

  //load more when user scrolls to the bottom
  //-increace the movielist when the user scrolls down

  it('should create', () => {
    expect(component).toBeTruthy(); //does this call ngOnInit()?
  });

  //getpage should be an asynchronous call
  it('movielist is filled with the getlistservice after component is created', async(async() => {
    //let response = fakePageResponseData;
    component.movielist = [];
    //expect(component.movielist.length).toEqual(0);
    //spyOn(getlistService,'getPage').and.returnValue(of({ totalResults: response.length, results: response})); //of() is synchronus
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.movielist.length).toBe(20);
  }));

  // //getpage should be an asynchronous call
  // xit('removedMovies[] are removed from movielist after fillList() is called', () => {
  //   let response = fakePageResponseData;
  //   let idOfDeletedMovie = Math.floor(Math.random() * Math.floor(20)); //random number from 0 to 19
  //   component.removedMovies = [idOfDeletedMovie];
  //   spyOn(getlistService,'getPage').and.returnValue(of({ totalResults: response.length, results: response}));
  //   component.fillList();
  //   expect(component.movielist.length).toEqual(19);
  // });

  // //getpage should be an asynchronous call
  // xit('fillList() sets movielist with a list containing 20 items when listservice.getPage returns 1 item', () => {
  //   let responseOne = [fakePageResponseData[0]]; //why do we need to reinitialise? when beforeEach resets it?
  //   spyOn(getlistService,'getPage').and.returnValue(of({ totalResults: responseOne.length, results: responseOne}));
  //   component.ngOnInit();
  //   expect(component.movielist.length).toEqual(20);
  // });
});
