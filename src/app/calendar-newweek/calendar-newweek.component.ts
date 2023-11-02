import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { CalendarService } from '../services/calendar.service';
import { CalendarDTO } from 'models';

@Component({
  selector: 'app-calendar-newweek',
  templateUrl: './calendar-newweek.component.html',
  styleUrls: ['./calendar-newweek.component.css']
})
export class CalendarNewweekComponent {
  constructor(
    public authenticationService: AuthenticationService,
    private calendarService: CalendarService,
    private toastrService: ToastrService, 
  ){}

  ngOnInit() {    
    this.getAllData();     
  }

  calendars: CalendarDTO[] = [];

  getAllData(){
    this.calendarService.getAll().subscribe({
      next: (calendars) => {  
        this.calendars = calendars;        
      }
    }); 
  }

  startNewWeek(){
    for (var counter in this.calendars){
      if (this.calendars[counter].istimetableclass==0){
        switch (this.calendars[counter].week) {
          case (1) : {
            this.deleteCalendar(this.calendars[counter]); break;
          }
          case (2) : 
          case (3) : {
            this.modifyCalendar(this.calendars[counter]); break;
          }
          default: console.error("Error: number of week impossible");
        }
      }      
    }
    this.toastrService.success('Adatok frissítve');
    this.getAllData();  
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

  changeWeek(calendar: CalendarDTO){
    switch (calendar.week) {
      case (2) : calendar.week=1; break;
      case (3) : calendar.week=2; break;
      default: console.error("Error: number of week impossible"); 
    }
  }

  modifyCalendar(calendar: CalendarDTO){
    this.changeWeek(calendar);
    this.calendarService.update(calendar).subscribe({
      next: (calendar) => {        
      },
      error: (err) => {
        this.toastrService.error('Időpont módosítása sikertelen');
      }
    });
  }
}
