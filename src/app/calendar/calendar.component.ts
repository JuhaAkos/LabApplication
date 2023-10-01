import { Component } from '@angular/core';
import { CalendarService} from '../services/calendar.service';
import { CalendarDTO, GroupDTO } from 'models';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  calendars: CalendarDTO[] = [];
  everyweekclasses: CalendarDTO[] = [];
  firstweekclasses: CalendarDTO[] = [];
  secondweekclasses: CalendarDTO[] = [];
  thirdweekclasses: CalendarDTO[] = [];

  constructor(
    private CalendarService: CalendarService,    
  ) { }  
  
  ngOnInit(): void {
    this.CalendarService.getAll().subscribe({
      next: (calendars) => {
        this.calendars = calendars;
       
        this.divideClasses();
        this.reloadAllWeekData();
        //console.log(this.currentWeeksclasses[72]);
      }
    });    
  }  

  divideClasses() {
    for (var counter in this.calendars) {
      if (this.calendars[counter].istimetableclass==1) {
        this.everyweekclasses.push(this.calendars[counter]);
      } else if (this.calendars[counter].week == 1) {
        this.firstweekclasses.push(this.calendars[counter]);
      } else if (this.calendars[counter].week == 2) {
        this.secondweekclasses.push(this.calendars[counter]);
      } else if (this.calendars[counter].week == 3) {
        this.thirdweekclasses.push(this.calendars[counter]);
      }
    }
  }

  public currentweeknumber?: number = 1;

  //80 because 5 day and 8 possible classes each day and max 2 per labroom
  //0. item -> first day first class first part of room
  //17. item -> second day second class first part of room
  currentWeeksclasses = Array<CalendarDTO | null>(90).fill(null);

  calculateClassOrder(calendar : CalendarDTO) : number{
    var classOrderNumber: number = 0;
    classOrderNumber =+ ((calendar.day -1) * 18) + (calendar.timeofclass * 2) + calendar.secondaryclass;
    //console.log(classOrderNumber);
    return classOrderNumber;
  }

  emptyCurrentWeek() {
    for (var counter in this.currentWeeksclasses) {
      this.currentWeeksclasses[counter]=null;
    }
  }

  loadCurrentWeekClasses(chosenweek: CalendarDTO[]) {
    for (var counter in chosenweek) {
      if (chosenweek[counter]!=null) {
        this.currentWeeksclasses[
          this.calculateClassOrder(
            chosenweek[counter]
          )] = chosenweek[counter];   
      }
    }
  }

  switchCurrentWeek(){
    this.loadCurrentWeekClasses(this.everyweekclasses);
    switch(this.currentweeknumber) { 
      case 1: { 
        console.log("hi");
        this.loadCurrentWeekClasses(this.firstweekclasses);
        break;
      }
      case 2: { 
        this.loadCurrentWeekClasses(this.secondweekclasses);
        break;
      }
      case 3: { 
        this.loadCurrentWeekClasses(this.thirdweekclasses);
        break;
      }
    }
  }

  reloadAllWeekData(){
    this.emptyCurrentWeek();    
    this.switchCurrentWeek();
  }

  changeToPreviousWeek() {
    if (this.currentweeknumber!=undefined &&this.currentweeknumber>1) {
      this.currentweeknumber--;
    } else {
      this.currentweeknumber=3;
    }
    this.reloadAllWeekData();
  }

  changeToNextWeek() {
    if (this.currentweeknumber!=undefined &&this.currentweeknumber<3) {
      this.currentweeknumber++;
    } else {
      this.currentweeknumber=1;
    }
    this.reloadAllWeekData();
  }


  ifFilled(whichClass : number) {
    if (this.currentWeeksclasses[whichClass] !== undefined && this.currentWeeksclasses[whichClass] !== null) {
      return true
    } 
    return false 
  }

  ifTimeTable(whichClass : number){    
    if (this.currentWeeksclasses[whichClass]?.istimetableclass == 1) {
      console.log(whichClass);
      return true;
    }
    return false;
  }

  groupsToString(groups: GroupDTO[] | undefined) : string{
    var groupString: string = "";
    if (groups != undefined) {      
      for (var counter in groups) {
        groupString = groupString + "/" + groups[counter].name;
      }
      groupString = groupString.substring(1);
    }
    return groupString;
  }
}
