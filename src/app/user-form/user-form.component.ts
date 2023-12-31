import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CalendarDTO, GroupDTO, UserDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent { 

  constructor( 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
  ) { }

  public isModify = true;
  showRole = "teacher";  

  ngOnInit(): void {

    if (this.router.url != "/user/form") {
      this.isModify = true;
      this.fillUpForm();
    } else {
      this.isModify = false;
    }
  }

  empty : GroupDTO[] = []
  empty2 : CalendarDTO[] = []

  userForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    username: this.formBuilder.control(''),
    password: this.formBuilder.control(''),
    role: "student",
    groups: this.formBuilder.control(this.empty),
    lessons: this.formBuilder.control(this.empty2),
  });

  currentUser?: UserDTO;

  fillUpForm() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.userService.getOne(id).subscribe({
      next: (currentUser) => {
        this.currentUser=currentUser;
        this.showRole=this.currentUser.role;    
        this.currentUser.password="";
        this.userForm.setValue(currentUser); 
      }
    })
  } 

  registerUser() {
    const loginData = this.userForm.value as UserDTO; 
    
    this.checkUserValue(loginData);
    
    this.userService.create(loginData).subscribe({
      next: (response) => {
        this.toastrService.success('Felhasználó sikeresen felvéve!', 'Siker');  
      },
      error: (err) => {
        this.toastrService.error(err.error.error, 'Error');
      }
    });
  }   


  modifyUser() {
    var userData = this.userForm.value as UserDTO;   
    
    this.checkUserValue(userData);

      this.userService.update(userData).subscribe({
      
        next: (userData1) => {
          this.toastrService.success('Fiók módosítva, id:' + userData1.id, 'Siker');
        },
        error: (err) => {
          this.toastrService.error('Fiók módosítása sikertelen');
        }
      }); 
  }

  checkUserValue(user: UserDTO){
    if (user.username.length<1) {
      this.toastrService.error('Felhasználónév megadása kötelező');  
      throw new Error('Incorrect registration username error.');
    }
    if (user.password.length<1) {
      this.toastrService.error('Jelszó megadása kötelező');  
      throw new Error('Incorrect registration password error.');
    }
    
  }
}
