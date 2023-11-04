import { Component } from '@angular/core';
import { CalendarDTO, GroupDTO, UserDTO } from 'models';

import { GroupService} from '../services/group.service';
import { CalendarService} from '../services/calendar.service';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.css']
})
export class CalendarFormComponent {
  groups: GroupDTO[] = [];
  calendars: CalendarDTO[] = [];
  public isSecondary = true;
  
  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,    
    private calendarService: CalendarService,
    private userService: UserService,
    private authenticationService: AuthenticationService,  
  ) { }

  ngOnInit(): void {
    const currentUserID=this.authenticationService.getID();

    this.userService.getOne(Number(currentUserID)).subscribe({
      next: (currentUser) => {
        this.currentUser=currentUser;
    }})

    this.groupService.getAll().subscribe({
      next: (groups) => {
        this.groups = groups;
      }        
    });  
    
    this.calendarService.getAll().subscribe({
      next: (calendars) => {
        this.calendars = calendars;
      }        
    });  
  } 

  private currentUser?: UserDTO;

  calendarForm = this.formBuilder.group({
    id: 0,
    week: this.formBuilder.control(''),
    day: this.formBuilder.control(''),
    timeofclass: this.formBuilder.control(''),
    activity: this.formBuilder.control(''),
    teachername: this.formBuilder.control(''),
    classroom: this.formBuilder.control(''),
    groups: null,
    secondaryclass: this.formBuilder.control(''),
    istimetableclass: this.formBuilder.control(''),
  });  

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

  calendar?: CalendarDTO;
  
  setCalendar(calendar : CalendarDTO) {
    calendar.week = this.getWeekNumber(Number(this.calendarForm.controls['week'].value!));    
    calendar.day = this.getDayNumber(Number(this.calendarForm.controls['day'].value!));
    calendar.timeofclass = this.getTimeofclassNumber(Number(this.calendarForm.controls['timeofclass'].value!));
    calendar.activity = this.calendarForm.controls['activity'].value!;
    calendar.teachername = this.calendarForm.controls['teachername'].value!;
    calendar.classroom = this.getClassRoomData(this.calendarForm.controls['classroom'].value!);
    calendar.groups = this.groups2;
    calendar.istimetableclass = this.getOneOrTwo(Number(this.calendarForm.controls['istimetableclass'].value!));
    return calendar;
  }

  getWeekNumber(week: number){
    switch(week) {
      case (1) : return 1;
      case (2) : return 2;
      case (3) : return 3;
      default: {
        //error
        return 1;
      }
    }
  }

  getDayNumber(day: number){
    switch(day) {
      case (1) : return 1;
      case (2) : return 2;
      case (3) : return 3;
      case (4) : return 4;
      case (5) : return 5;
      default: {
        //error
        return 1;
      }
    }
  }

  getTimeofclassNumber(timeofclass: number){
    switch(timeofclass) {
      case (0) : return 0;
      case (1) : return 1;
      case (2) : return 2;
      case (3) : return 3;
      case (4) : return 4;
      case (5) : return 5;
      case (6) : return 6;
      case (7) : return 7;
      case (8) : return 8;
      default: {
        //error
        return 1;
      }
    }
  }

  getOneOrTwo(yesOrNO: number){
    switch(yesOrNO) {
      case (0) : return 0;
      case (1) : return 1;
      default: {
        //error
        return 1;
      }
    }
  }

  groups2: GroupDTO[] = []; 
  getGroupFromCheckBox(group: GroupDTO) {  
    const checkedCar = this.groups2.find(c => c.id === group.id);
    if(checkedCar)
    {
      this.groups2.splice(this.groups2.indexOf(checkedCar), 1);
    }
    else
    {
      this.groups2.push(group);
    }
  }

  getClassRoomData(classroom : string){
    if (classroom == "kémia labor") {
      return "kémia labor";
    }
    if (classroom == "fizika labor") {
      return "fizika labor";
    }
    if (classroom == "teljes labor") {
      return "teljes labor";
    }
    //error
    return "kémia labor";
  }

  isOverlap:boolean = false;

  checkClassOverlap(currentCalendar: CalendarDTO){    

    this.isOverlap = false;

    if (currentCalendar.istimetableclass == 1){
      for (var counter in this.calendars) {
        if (this.calendars[counter].day==currentCalendar.day && this.calendars[counter].timeofclass==currentCalendar.timeofclass) {

          if (currentCalendar.classroom == "teljes labor" 
            || this.calendars[counter].classroom == "teljes labor" 
              || currentCalendar.classroom == this.calendars[counter].classroom) {
                this.isOverlap = true;

                break;
          }

        }
      }
    } else if (currentCalendar.istimetableclass == 0){
      for (var counter in this.calendars) {
        if (this.calendars[counter].week==currentCalendar.week && this.calendars[counter].day==currentCalendar.day && this.calendars[counter].timeofclass==currentCalendar.timeofclass
          || this.calendars[counter].day==currentCalendar.day && this.calendars[counter].timeofclass==currentCalendar.timeofclass && this.calendars[counter].istimetableclass==1) {
          
          if (currentCalendar.classroom == "teljes labor" 
            || this.calendars[counter].classroom == "teljes labor" 
              || currentCalendar.classroom == this.calendars[counter].classroom) {
                this.isOverlap = true;

                break;
          }

        }
      }
    }    
  }

  ifDataEmpty(calendar : CalendarDTO){
    if (calendar.activity.length<1){
      calendar.activity="";
    }
  }

  setDesc(calendar : CalendarDTO){
    if (this.currentUser?.username!= undefined) {
      calendar.teachername=this.currentUser.username;
    }
  }

  saveCalendar(){
    let calendar1 = {} as CalendarDTO;
    
    this.setCalendar(calendar1);    
    
    this.checkClassOverlap(calendar1);

    this.ifDataEmpty(calendar1);
    this.setDesc(calendar1);

    if (this.currentUser!=undefined){
      calendar1.teacher=this.currentUser;
    }
    
    
    if (this.isOverlap == false) {
      this.calendarService.create(calendar1).subscribe({
        next: (calendar) => {       
        }
      });
    }    
  }


}