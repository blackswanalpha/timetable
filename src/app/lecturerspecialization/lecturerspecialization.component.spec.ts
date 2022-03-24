import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerspecializationComponent } from './lecturerspecialization.component';

describe('LecturerspecializationComponent', () => {
  let component: LecturerspecializationComponent;
  let fixture: ComponentFixture<LecturerspecializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LecturerspecializationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerspecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
