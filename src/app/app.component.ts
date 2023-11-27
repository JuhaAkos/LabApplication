import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { UserDTO } from 'models';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Labor-app';

  private currentUserRole!: string | null;
  user!: UserDTO;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  logout() {
    this.authenticationService.setRole('');
    this.authenticationService.removeToken();
    this.router.navigateByUrl('/');
    this.toastrService.success('Sikeresen kijelentkezett.', 'Kilépés');    
    this.ngOnInit();
  }

  ngOnInit() {     
   
    this.currentUserRole = this.authenticationService.getRole();

    const currentUserID=this.authenticationService.getID();
    
    if (currentUserID!=null){
      this.userService.getOne(Number(currentUserID)).subscribe({
        next: (currentUser) => {
          this.currentUser=currentUser;
      }})
    } else {
      this.navigateToMainmenu();
    } 
    
    this.checkForDefaultUser();
  }

  private currentUser?: UserDTO | null;

  getCurrentUsername(){
    return this.currentUser?.username;
  }

  getCurrentRole(){
    return this.currentUser?.role;
  }

  checkRoles(roles: string[]) {
    return roles.includes(this.currentUserRole!);
  }

  navigateToLogin(){
    this.router.navigateByUrl('/login');
  }

  navigateToMainmenu(){
    this.router.navigateByUrl('/menu');
  }



  checkForDefaultUser(){
    this.userService.findByName("admin").subscribe({
      next: (isUserByname) => {
        if (!isUserByname) {
          this.createDefaultUser();
        }
    }})    
  }

  userForm = this.formBuilder.group({
    id: 0,
    username: "admin",
    password: "admin",
    role: "admin",
  });

  createDefaultUser(){    
    const loginData = this.userForm.value as UserDTO;
    
    this.userService.create(loginData).subscribe({
      next: (response) => {
      },
      error: (err) => {
        this.toastrService.error(err.error.error, 'Error');
      }
    });
  }  

  
}