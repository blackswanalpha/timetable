import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusdayComponent } from './campusday.component';

describe('CampusdayComponent', () => {
  let component: CampusdayComponent;
  let fixture: ComponentFixture<CampusdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampusdayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
