import { TestBed } from '@angular/core/testing';

import { CampusdayService } from './campusday.service';

describe('CampusdayService', () => {
  let service: CampusdayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampusdayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
