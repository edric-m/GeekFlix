import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovielistComponent } from './movielist.component';
import { GetlistService } from '../getlist.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
//import { ignoreElements } from 'rxjs/operators';
//import { Injectable } from '@angular/core';
import { Movie } from '../movie.model';
//import { HttpClient } from '@angular/common/http';

const fakeList = [
  {poster_path: 'string',
    id: 1,
    original_title: 'string',
    overview: 'string'},
  {poster_path: 'string',
    id: 2,
    original_title: 'string',
    overview: 'string'},
  {poster_path: 'string',
    id: 3,
    original_title: 'string',
    overview: 'string'},
  {poster_path: 'string',
    id: 4,
    original_title: 'string',
    overview: 'string'},
  {poster_path: 'string',
    id: 5,
    original_title: 'string',
    overview: 'string'},
  {poster_path: 'string',
    id: 6,
    original_title: 'string',
    overview: 'string'},
];

// //@Injectable() //neccesary?
// class MockListService {
//   listURL: string = "https://api.themoviedb.org/3/discover/movie?api_key=b45808cfc639faa44235410b835b0912&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false";
//   movieURLprefix: string = "https://api.themoviedb.org/3/movie/";
//   movieURLsuffix: string = "?api_key=b45808cfc639faa44235410b835b0912&language=en-US";
//   relatedURLsuffix: string = "/similar?api_key=b45808cfc639faa44235410b835b0912&language=en-US&page=1";
//   page: string = "&page="; //page 1 only for now should be component input as integer
//   genre: string = "&with_genres=878";

//   constructor(private http: HttpClient) { } //error cannot resolve all parameters for MockedListService(?)

//   getPage(page: number) {
//     //this.listResults = this.getList(page);
//     let movieResults: Movie[];
//     for(let i=0;i<20;i++) {
//       movieResults.push({
//         poster_path: 'posterPath' + i,
//         id: i,
//         original_title: 'title' + i,
//         overview: 'overview' + i
//       });
//     }
//     return { totalResults: 20, results: movieResults};
//   }

//   getMoviePage(movieId: number) {
//     //return this.getMovie(movieId);
//     return {
//       poster_path: 'posterPath' + movieId,
//       id: movieId,
//       original_title: 'title' + movieId,
//       overview: 'overview' + movieId
//     }
//   }

//   getRelatedMovies(movieId: number) {
//     //return this.getRelated(movieId);
//     let movieResults: Movie[];
//     for(let i=0;i<20;i++) {
//       movieResults.push({
//         poster_path: 'posterPath' + i,
//         id: i,
//         original_title: 'title' + i,
//         overview: 'overview' + i
//       });
//     }
//     return movieResults;
//   }
// }

describe('MovielistComponent', () => {
  let component: MovielistComponent;
  let fixture: ComponentFixture<MovielistComponent>;
  let getlistService: GetlistService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ MovielistComponent ],
      //providers: [ { provide: GetlistService, useClass: MockListService } ] //overwrite service with mocked service
      providers: [ GetlistService, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovielistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    //inject the serve class to the component instance, but instead will used mocked service
    getlistService = TestBed.get(GetlistService);

  });

  it('should create', () => {
    expect(component).toBeTruthy(); //does this call ngOnInit()?
  });

  it('component initialises with the mocked service using spyOn', () => {
    // let movieResults: Movie[];
    // for(let i=0;i<20;i++) {
    //   movieResults.push({
    //     poster_path: 'posterPath' + i,
    //     id: i,
    //     original_title: 'title' + i,
    //     overview: 'overview' + i
    //   });
    // }
    spyOn(getlistService,'getPage').and.returnValue(of({ totalResults: 7, results: fakeList}));
    component.ngOnInit();
    expect(component.movielist.length).toEqual(20);
  });

  //getpage returns list of 20 (mock the service)
  // it('getpage(pageNumber) sets movielist[] to a list of 20', () => {
  //   component.ngOnInit();
  // });

  //when getpage returns list of 0, return 20

  //when getpage returns list of 1, return 20

  //ngOnInit always results in a list of 20

  //ngOnInit removes an item from the list

  //test when movie count is less than 20

  //test when no data is loaded
});
