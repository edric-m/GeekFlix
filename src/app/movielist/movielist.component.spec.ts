import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovielistComponent } from './movielist.component';
import { GetlistService } from '../getlist.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
//import { ignoreElements } from 'rxjs/operators';
import { Movie } from '../movie.model';
import { Observable } from 'rxjs';



describe('MovielistComponent', () => {
  let component: MovielistComponent;
  let fixture: ComponentFixture<MovielistComponent>;
  let getlistService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ MovielistComponent ],
      providers: [ GetlistService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovielistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    //inject the serve class to the component instance
    getlistService = TestBed.inject(GetlistService)
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy(); //does this call ngOnInit()?
  // });

  // it('should use getListService', () => {
  //   expect(getlistService.getPage()).toBe('real value');
  // });

  // it('should get the data from the getlist service using getPage(id:number)', async(() => {
  //   expect(getlistService.getPage)
  // }));

  // it('should return error when the http request fails', () => {
  // });

  //test when movie count is less than 20

  //test when no data is loaded

  //test when alignment is off?

  //test that element is of a specific size
});
