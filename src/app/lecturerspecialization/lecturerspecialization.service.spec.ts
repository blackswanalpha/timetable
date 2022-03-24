import { TestBed } from '@angular/core/testing';

import { LecturerspecializationService } from './lecturerspecialization.service';

describe('LecturerspecializationService', () => {
  let service: LecturerspecializationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LecturerspecializationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
