import { TestBed } from '@angular/core/testing';

import { GetlistService } from './getlist.service';

describe('GetlistService', () => {
  let service: GetlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
