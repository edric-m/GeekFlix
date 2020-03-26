import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovielistComponent } from './movielist.component';
import { GetlistService } from '../getlist.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { defer, of } from 'rxjs';
//import { ignoreElements } from 'rxjs/operators';
//import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import fakePageResponseData from '../fakeList.data';

//https://netbasal.com/testing-observables-in-angular-a2dbbfaf5329
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
      //imports: [ HttpClientTestingModule ], //no need to import this?
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
    //fixture.detectChanges();
  });

  //behavior of the component from the users point of view
  //we asserst specific things to be true if that behavior were implemented

  //see a list of movies from the api
  //-there is a list filled with movie information
  it('should have a list of movies to show the user', async(async() => {
    //assemble
    component.movielist = [];
    fixture.detectChanges();

    //act
    await fixture.whenStable();
    fixture.detectChanges();

    //assert
    expect(component.movielist.length > 0).toBeTrue();
  }));
  
  //delete a movie from the list
  //-the movie is part of a deleted list
  it('should not include the movies whose id is contained in \'removedMovies\'', async(async() => {
    //assemble
    fixture.detectChanges();
    let idOfDeletedMovie = Math.floor(Math.random() * Math.floor(20)); //random number from 0 to 19
    component.removedMovies = [idOfDeletedMovie];
    
    //act
    await fixture.whenStable();
    //fixture.detectChanges(); //ommitted because ngOnInit accesses localStorage.getItem()

    //assert
    expect(component.movielist.length).toEqual(19);
    expect(component.removedMovies).toEqual([idOfDeletedMovie]);
  }));

  //load more when user scrolls to the bottom
  //-increace the movielist when the user scrolls down
  it('should increace the number of movies to list when the page\'s \'More\' button is clicked', async(async() => {
    //assemble 
    fixture.detectChanges();
    await fixture.whenStable();
    let oldMovieListLength = component.movielist.length;

    //act 
    component.loadMoreMovies();
    await fixture.whenStable(); //this line is skipped because its async, i dont think there is use in calling twice?
    fixture.detectChanges();

    //assert
    expect(component.movielist.length > oldMovieListLength).toBeTrue();
    //expect(component.movielist.length).toEqual(expectedMovieListLength); //don't write fragile tests
  }));

  it('should not add duplicate movies to the list', async(async() => {
    //assemble
    fixture.detectChanges();
    component.removedMovies = [0]; //id of the first item in the stub
    let movieListLength = 20; //20 is the ammount of items in the stub
    await fixture.whenStable();
    expect(component.movielist.length).toEqual(movieListLength - 1);
    
    //act 
    component.removedMovies = []; //dont remove any for the next get page
    component.loadMoreMovies();
    await fixture.whenStable(); //this line is skipped because its async, i dont think there is use in calling twice?
    fixture.detectChanges();

    //assert
    expect(component.movielist.length).toEqual(movieListLength);
  }));

  it('should have at least 20 movies added to the list when the page loads', async(async() => {
    //assemble
    fixture.detectChanges();
    component.removedMovies = [0,1,2]; //id of the first item in the stub
    let movieListLength = 20; //20 is the ammount of items in the stub
    
    //act 
    await fixture.whenStable();

    //assert
    expect(component.movielist.length).toEqual(movieListLength);
    //the new items should be added to the end
    expect(component.movielist[17].id).toEqual(0);
    expect(component.movielist[18].id).toEqual(1);
    expect(component.movielist[19].id).toEqual(2);
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
