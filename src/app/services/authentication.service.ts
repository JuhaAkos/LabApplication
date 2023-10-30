import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private TOKEN_KEY = 'accessToken';
  private ROLE_KEY = 'role';
  private ID_KEY = 'id';

  constructor(
      private router: Router      
    ) { }

  setToken(token: string) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  removeToken() {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  setRole(role: string) {
    sessionStorage.setItem(this.ROLE_KEY, role);
  }

  getRole(): string | null {
    return sessionStorage.getItem(this.ROLE_KEY);    
  }
  
  setID(id: string) {
    sessionStorage.setItem(this.ID_KEY, id);
  }

  getID(): string | null {
    return sessionStorage.getItem(this.ID_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  preventGuestAccess(): boolean {
    const isLoggedIn = this.isLoggedIn();

    if (!isLoggedIn) {      
        this.router.navigateByUrl('/login');
    }

    return isLoggedIn;
  }

  restrictToRolesOf(roles: string[]) {
    const userRole = this.getRole() || '';

    if (!roles.includes(userRole)) {
        this.router.navigateByUrl('/');
        return false;
    } else {
        // TODO
        return true;
    }
  } 

}