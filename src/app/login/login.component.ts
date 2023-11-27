import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    username: this.formBuilder.control(''),
    password: this.formBuilder.control('')
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit(){ 
    if (this.authenticationService.isLoggedIn())  {
      this.router.navigateByUrl('/menu');
    }
  }  

  login() {
    const loginData = this.loginForm.value as LoginDTO;

    this.userService.login(loginData).subscribe({
      next: (response) => {
        this.authenticationService.setToken(response.accessToken);
        this.authenticationService.setRole(response.role); 
        this.authenticationService.setID(response.id);    
       
        location.reload();   
      },
      error: (err) => {
        this.toastrService.error(err.error.error, 'Error');
      }
    });
  }
}