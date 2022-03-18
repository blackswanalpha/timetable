import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonavComponent } from './buttonav.component';

describe('ButtonavComponent', () => {
  let component: ButtonavComponent;
  let fixture: ComponentFixture<ButtonavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
