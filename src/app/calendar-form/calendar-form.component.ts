import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.css']
})
export class CalendarFormComponent {
  
  public isSecondary = true;

  switchSecondary(){
    if (this.isSecondary) {
      this.isSecondary = true;
    }
    else this.isSecondary = false;
  }

  public isTimeTableClass = false;

  switchTimeTableClass(){
    if (this.isTimeTableClass) {
      this.isTimeTableClass = true;
    }
    else this.isTimeTableClass = false;
  }
}

