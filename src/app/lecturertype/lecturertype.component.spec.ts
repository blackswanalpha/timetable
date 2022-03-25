import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturertypeComponent } from './lecturertype.component';

describe('LecturertypeComponent', () => {
  let component: LecturertypeComponent;
  let fixture: ComponentFixture<LecturertypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LecturertypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
