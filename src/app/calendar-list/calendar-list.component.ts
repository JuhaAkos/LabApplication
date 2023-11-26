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
    this.calendars = [];
    this.calendarService.getUserCalendar().subscribe({
      next: (calendars) => {  
        this.calendars = calendars;        
      }
    });   
  }

  getUserDataAndPressButton(){
    this.isButtonPressed();
    this.getUserCalendarData(); 
  }

  isAllCalendar = false;

  getAdminAllCalendar(){
    this.calendars = [];
    this.isButtonPressed();
    this.calendarService.getAll().subscribe({
      next: (calendars) => {  
        this.calendars = calendars;        
      }
    }); 
  }

  isButtonPressed(){
    if (this.isAllCalendar == false) {
      this.isAllCalendar = true;
    } else {
      this.isAllCalendar = false;
    }
  }

  isUserAdmin(){
    const role = this.authenticationService.getRole();
    const roles = ['admin'];
    if (roles.includes(role!)) {
      return true;
    }
    return false;
  }
  
  deleteCalendar(calendar: CalendarDTO){
    this.calendarService.delete(calendar.id).subscribe({
      next: () => {        
        this.toastrService.success('Időpont ID: ' + calendar.id + " törölve.", 'Siker');
        this.refreshOnDelete()           
      },
      error: (err) => {        
        this.toastrService.error('Hiba a tétel törlésekor.', 'Hiba');
      }
    })
  }

  refreshOnDelete(){
    if (this.isAllCalendar) {
      this.calendars = [];
      this.calendarService.getAll().subscribe({
        next: (calendars) => {  
          this.calendars = calendars;        
        }
      }); 
    } else {
      this.getUserCalendarData();
    }   
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
      case 0: {return "egyszeri";}
      case 1: {return "órarendi";}
      default: {return "egyszeri";}
    } 
  }
}
