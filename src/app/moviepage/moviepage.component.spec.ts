import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviepageComponent } from './moviepage.component';
import { GetlistService } from '../getlist.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { defer } from 'rxjs';
import fakePageResponseData from '../fakeList.data';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

//https://netbasal.com/testing-observables-in-angular-a2dbbfaf5329
export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
const listServiceStub = {
  getMoviePage(id: number) {
    return fakeAsyncResponse({
      poster_path: 'nada',
      id: id,
      original_title: 'focused_movie_stub_title',
      overview: 'focused_movie_stub_overview'
    });
  },
  getRelatedMovies(id: number) {
    return fakeAsyncResponse(
      fakePageResponseData
    );
  }
}

describe('MoviepageComponent', () => {
  let component: MoviepageComponent;
  let fixture: ComponentFixture<MoviepageComponent>;
  let getlistService: GetlistService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      //imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ MoviepageComponent ],
      providers: [ { provide: GetlistService, useValue: listServiceStub },
                  { provide: ActivatedRoute, useValue: {params: of({id: 123, name: 'nada'})} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviepageComponent);
    component = fixture.componentInstance;
    getlistService = TestBed.get(GetlistService);
    //do we have to inject ActivatedRoute?
    spyOn(window.localStorage, 'getItem').and.callFake(function() {
			return JSON.stringify([]);
		});
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //test the behavior of the component from the users point of view
  //we asserst specific things to be true if that behavior were implemented
  //think about the inputs and the outputs of the component

  it('should not have a \'related\' section if there is no movies in the related movies list', async(async() => {
    //--assemble
    let compiled = fixture.debugElement.nativeElement;
    component.hasRelatedMovies = false;
    //fixture.detectChanges();
    //--act
    await fixture.whenStable();
    //--act
    //expect(component.relatedMovies.length).toBe(0);
    expect(compiled.querySelector('.related_title').textContent).toEqual('');
  }));

  //xit('should not display a deleted movie after the user has deleted it', () => {

  it('should not store movies that are part of the deleted movies list', async(async() => {
    //--assemble
    fixture.detectChanges();
    component.removedMovies = [0]; //0 is the id of the first movie in the stub
    //--act
    //load movie and related movies using the getlistService
    await fixture.whenStable();
    //--assert
    expect(component.relatedMovies).not.toContain({ 
      poster_path: 'fakePosterPath', 
      id: 0, 
      original_title: 'fakeTitle_0', 
      overview: 'fakeOverview' 
    });
  }));
  
  it('should initialise the page with the information from the router parameter', async(async() => {
    //--assemble
    fixture.detectChanges();
    //--act
    //load movie and related movies uses the getlistService
    await fixture.whenStable();
    //--assert
    expect(component.movieTitle).toEqual('focused_movie_stub_title');
  }));

  it('should load movies that are related to the movie selected', async(async() => {
    //--assemble
    fixture.detectChanges();
    //--act
    //load movie and related movies uses the getlistService
    await fixture.whenStable();
    //--assert
    expect(component.relatedMovies.length).toEqual(20);
  }));

  xit('should store information about the related movies', async(async() => {
    //--assemble
    //--act
    //--assert
  }));

  //test data loaded

  //test placeholders when no data loaded

  //test 'related' title disappears when no data loaded

  //test that movie id is removed from local storage if no emotions exist
});
