import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../services/group.service';
import { ToastrService } from 'ngx-toastr';
import { GroupDTO, UserDTO } from 'models';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent {

  constructor( 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private toastrService: ToastrService,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { }

  public isModify = true; 

  ngOnInit(): void {
    const currentUserID=this.authenticationService.getID();

    this.userService.getOne(Number(currentUserID)).subscribe({
      next: (currentUser) => {
        this.currentUser=currentUser;
    }})

    if (this.router.url != "/group/form") {
      this.isModify = true;
      this.fillUpForm();
    } else {
      this.isModify = false;
    }
  }

  groupForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    name: this.formBuilder.control(''),
    teacherId: Number(this.formBuilder.control('')),
    studentnames: this.formBuilder.control(''),    
  });

  currentGroup?: GroupDTO;
  private currentUser?: UserDTO;

  fillUpForm() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.groupService.getOne(id).subscribe({
      next: (currentGroup) => {
        this.currentGroup=currentGroup;
        this.groupForm.setValue(currentGroup);      
      }
    })
  }

  addGroup(){
    const groupData = this.groupForm.value as GroupDTO; 

    if (this.currentUser != undefined)   {
      groupData.teacher=this.currentUser;
      groupData.teacherId=this.currentUser.id;      
    }

    this.checkGroupValue(groupData);
    
    this.groupService.create(groupData).subscribe({
      next: (response) => {
        this.toastrService.success('Csoport siekresen létrehozva!');
        this.ngOnInit
      },
      error: (err) => {
        this.toastrService.error(err.error.error, 'Error');
      }
    });
  }  

  modifyGroup() {
    const groupData = this.groupForm.value as GroupDTO;

    this.groupService.update(groupData).subscribe({
      next: (groupData) => {
        this.toastrService.success('Csoport módosítva, id:' + groupData.id, 'Siker');
      },
      error: (err) => {
        this.toastrService.error('Csoport módosítása sikertelen');
      }
    });
  }

  checkGroupValue(group: GroupDTO){
    if (group.name.length<1) {
      this.toastrService.error('A csoport nevének megadása kötelező');  
      throw new Error('Incorrect groupname error.');
    }    
  }

  
  
}
