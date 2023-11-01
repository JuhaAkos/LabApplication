import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CalendarService} from '../services/calendar.service';
import { CalendarDTO } from 'models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css']
})

export class CalendarListComponent {  
  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    private calendarService: CalendarService,
    private toastrService: ToastrService, 
  ){}

  calendars: CalendarDTO[] = [];

  ngOnInit() {
    this.getUserCalendarData();    
  }

  getUserCalendarData(){
    this.calendarService.getUserCalendar().subscribe({
      next: (calendars) => {  
        this.calendars = calendars;        
      }
    });   
  }
  
  deleteCalendar(calendar: CalendarDTO){
    this.calendarService.delete(calendar.id).subscribe({
      next: () => {        
      },
      error: (err) => {        
        this.toastrService.error('Hiba a tétel törlésekor.', 'Hiba');
      }
    })
  }

  navigateToCalendarForm(){
    this.router.navigate(['/calendar/form']);
  }

  dayToString(day: number){
    switch (day) {
     case 1: {return "hétfő";}
     case 2: {return "kedd";}
     case 3: {return "szerda";}
     case 4: {return "csütörtök";}
     case 5: {return "péntek";}
     default: {return "hétfő";}
    }
  }

  timetableToString(timetable: number){
    switch (timetable) {
      case 0: {return "órarendi";}
      case 1: {return "egyszeri";}
      default: {return "egyszeri";}
    } 
  }
}
