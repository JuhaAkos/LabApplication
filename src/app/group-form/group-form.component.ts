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
    
    this.groupService.create(groupData).subscribe({
      next: (response) => {
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
  
}
