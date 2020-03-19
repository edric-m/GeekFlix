import { TestBed } from '@angular/core/testing';

import { GetlistService } from './getlist.service';
import { HttpClientModule } from '@angular/common/http';

describe('GetlistService', () => {
  let service: GetlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ GetlistService ]
    });
    service = TestBed.inject(GetlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //test that page list is always 20 items long
});
