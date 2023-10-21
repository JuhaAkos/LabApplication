import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from 'models';
import { expressjwt } from "express-jwt";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }  
  
  /*
  preventNonAdminAccess(): boolean {
    const isLoggedInAdmin = this.isAdmin();
    
    if (!isLoggedInAdmin) {
        console.log("bye");
        this.router.navigateByUrl('/login');
    }

    return isLoggedInAdmin;
  }

  preventNonTeacherAccess(): boolean {
    const isLoggedInTeacher = this.isTeacher();

    if (!isLoggedInTeacher ) {
        this.router.navigateByUrl('/login');
    }

    return isLoggedInTeacher ;
  }
  */
}
