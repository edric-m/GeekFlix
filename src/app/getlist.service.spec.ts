import { TestBed } from '@angular/core/testing';

import { GetlistService } from './getlist.service';
import { Movie } from './movie.model';

// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const testUrl = "https://api.themoviedb.org/3/discover/movie?api_key=b45808cfc639faa44235410b835b0912&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=878";

describe('GetlistService', () => {
  let service: GetlistService;

  let httpClient: HttpClient; 
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ GetlistService ]
    });
    service = TestBed.inject(GetlistService);

    // Inject the http service and test controller for each test
    //httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test getPage(1) to request the first page', () => {
    const testData: { totalResults: number; results: Movie[]} = { totalResults: undefined, results: [{
      poster_path: 'string',
      id: 1,
      original_title: 'string',
      overview: 'string',
    }]};

    // Make an HTTP GET request
    service.getPage(1)
      .subscribe(data =>
        // When observable resolves, result should match test data
        expect(data).toEqual(testData)
      );

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(testUrl);

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });
});
