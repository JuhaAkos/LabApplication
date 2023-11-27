import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarDTO, GroupDTO, UserDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { CalendarService } from '../services/calendar.service';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  userForm = this.formBuilder.group({
    id: 0,
    username: this.formBuilder.control(''),
    password: this.formBuilder.control(''),
    role: "student",
    groups: null,
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private calendarService: CalendarService,
    private groupService: GroupService,
    private router: Router,
    private toastrService: ToastrService,
    ) { }

  users: UserDTO[] = [];   
    
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.users=[];
    this.userService.getAll().subscribe({
      next: (users) => {
        this.users = users;     
      }
    });
  }

  groupToString(groups: GroupDTO[] | undefined | null) : string{
    var groupString: string = "";
    if (groups != undefined || groups != null) {      
      for (var counter in groups) {
        groupString = groupString + ", " + groups[counter].name;
      }
      groupString = groupString.substring(2);
    }
    return groupString;
  }

  startUserDeletion(user: UserDTO){
    this.getUserGroups(user);

  }

  
  deleteUser(user: UserDTO){
    
    this.userService.delete(user.id).subscribe({
      next: () => { 
        this.toastrService.success('Felhasználó törölve Id:' + user.id, 'Siker');    
        const index = this.users.indexOf(user);
        if (index > -1) {
          this.users.splice(index, 1);
        }  
      },
      error: (err) => {        
        this.toastrService.error('Hiba a tétel törlésekor.', 'Hiba');
      }
    })
    
    
  }

  groups: GroupDTO[] = [];
  usergroups: GroupDTO[] = [];
  getUserGroups(userToDelete: UserDTO) {   
    this. usergroups =[];

    this.groupService.getAll().subscribe({
      next: (groups1) => {
        this.groups = groups1;

        for (var counter in this.groups) {
          if (this.groups[counter].teacherId == userToDelete.id) {

            this.usergroups.push(this.groups[counter]);
          }
        }
        this.deleteUserGroups(userToDelete);
        
      }
    });
  }

  deleteUserGroups(userToDelete: UserDTO) { 
    if (this.usergroups.length>0) {
    for (var counter in this.usergroups) {
      if ((Number(counter)+1)<this.usergroups.length){
        this.groupService.delete(this.usergroups[counter].id).subscribe({});
      } else {
        this.groupService.delete(this.usergroups[counter].id).subscribe({
          next: () => {this.getUserCalendars(userToDelete)}
        });
      }      
      //this.groupService.delete(this.usergroups[counter].id).subscribe({});
    }  
    } else {
      this.getUserCalendars(userToDelete);
    }
  }

  calendars: CalendarDTO[] = [];
  usercalendars: CalendarDTO[] = [];
  getUserCalendars(userToDelete: UserDTO) { 
    this. usercalendars =[];

    this.calendarService.getAll().subscribe({
      next: (calendars1) => {
        this.calendars = calendars1;

        for (var counter in this.calendars) {
          if (this.calendars[counter].teachername == userToDelete.username) {

            this.usercalendars.push(this.calendars[counter]);
          }
        }
        this.deleteUserCalendars(userToDelete);
        
      }
    });
  }

  deleteUserCalendars(userToDelete: UserDTO) { 
    if (this.usercalendars.length>0) {
    for (var counter in this.usercalendars) {
      if ((Number(counter)+1)<this.usercalendars.length){
        this.calendarService.delete(this.usercalendars[counter].id).subscribe({});
      } else {
        this.calendarService.delete(this.usercalendars[counter].id).subscribe({
          next: () => {            
            this.deleteUser(userToDelete)}
        });
      }      
    }   
    } else {
      this.deleteUser(userToDelete);
    }
  }



  
  navigateToModifyUser(user: UserDTO){
    this.router.navigate(['/user/form', user.id]);
  }  

  registerUser() {
    const loginData = this.userForm.value as UserDTO;
    
    this.userService.create(loginData).subscribe({
      next: (response) => {
        //this.authenticationService.setToken(response.accessToken);
        //this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.toastrService.error(err.error.error, 'Error');
      }
    });
  }
}