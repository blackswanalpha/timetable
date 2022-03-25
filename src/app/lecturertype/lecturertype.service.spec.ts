import { TestBed } from '@angular/core/testing';

import { LecturertypeService } from './lecturertype.service';

describe('LecturertypeService', () => {
  let service: LecturertypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LecturertypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
