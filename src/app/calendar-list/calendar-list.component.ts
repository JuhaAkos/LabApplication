import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CalendarService} from '../services/calendar.service';
import { CalendarDTO } from 'models';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css']
})

export class CalendarListComponent {
  constructor(
    public authenticationService: AuthenticationService,
    private CalendarService: CalendarService, 
  ){}

  private currentUserID!: number | null;
  calendars: CalendarDTO[] = [];


  ngOnInit() {
    this.currentUserID = Number(this.authenticationService.getID());
    this.getUserCalendarData();
    console.log("hossz: " + this.calendars.length);
  }

  getUserCalendarData(){
    this.CalendarService.getUserCalendar(Number(this.currentUserID)).subscribe({
      next: (calendars) => {
        this.calendars = calendars;    
      }
    });  
  } 
}
