import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { GroupService } from '../services/group.service';
import { ToastrService } from 'ngx-toastr';
import { GroupDTO, UserDTO } from 'models';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent {
  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    private groupService: GroupService,
    private userService: UserService,
    private toastrService: ToastrService, 
  ){}

  groups: GroupDTO[] = [];
  users: UserDTO[] = [];

  ngOnInit() {
    this.groupService.getAll().subscribe({
      next: (groups) => {  
        this.groups = groups;              
      }
    });   
    this.userService.getAll().subscribe({
      next: (users) => {  
        this.users = users;              
      }
    });   
  }

  isCurrentUserGroup(group: GroupDTO){
    const currentUserID=this.authenticationService.getID();

    if (group.teacherId == Number(currentUserID)) {
      return true;
    }
  
    return false; 
  }


  getGroupTeacher(group: GroupDTO){
    for (var counter in this.users ){
      if (group.teacherId==this.users[counter].id){
        return this.users[counter].username;
      }
    }
    return ""
  }
 
  navigateToGroupModify(group: GroupDTO){
    this.router.navigate(['/group/form', group.id]);
  }  

  deleteGroup(group: GroupDTO){
    this.groupService.delete(group.id).subscribe({
      next: () => {        
      },
      error: (err) => {        
        this.toastrService.error('Hiba a tétel törlésekor.', 'Hiba');
      }
    })
  }

}
