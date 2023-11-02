import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarNewweekComponent } from './calendar-newweek.component';

describe('CalendarNewweekComponent', () => {
  let component: CalendarNewweekComponent;
  let fixture: ComponentFixture<CalendarNewweekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarNewweekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarNewweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
