import { TestBed } from '@angular/core/testing';

import { UserdataService } from './userdata.service';

describe('UserdataService', () => {
  let service: UserdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //COMPONENT BEHAVIOURS 
  //store deleted movies
  //get deleted movies
  //save emotions for a movie
  //delete a movie for a movie
  //save movies for an emotion
  //delete movies for an emotion

  //COMPONENT DATA
  //removed movies: number[]
  //movieEmotions: {id: number, emotions: string[]}
  //emotions: {id: emoji, movies: number[]}
});
