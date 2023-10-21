import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO, UserDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

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
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastrService: ToastrService) { }

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