import { Component } from '@angular/core';
import { CalendarService} from '../services/calendar.service';
import { CalendarDTO } from 'models';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  calendars: CalendarDTO[] = [];

  constructor(
    private CalendarService: CalendarService,    
  ) { }

  public currentweek?: number = 1;
  
  ngOnInit(): void {
    this.CalendarService.getAll().subscribe({
      next: (calendars) => {
        this.calendars = calendars;
        console.log(calendars.length);
      }
    });
  }  

  //80 because 5 day and 8 possible classes each day and max 2 per labroom
  //0. item -> first day first class first part of room
  //17. item -> second day second class first part of room
  currentWeeksclass = Array<CalendarDTO | null>(80).fill(null);

  getFirstWeek() {

  }

  ifFilled(whichClass : number) {
    console.log("called: " + whichClass);
    if (this.calendars[whichClass] !== undefined) {
      //console.log(whichClass + ". ezitten: " + this.calendars[whichClass].activity);
      return true
    } 
    //console.log(whichClass + ". ezmeghazudik: ");
    console.log("passed");
    return false 
  }
}
