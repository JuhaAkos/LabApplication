import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Labor-app';

  private currentUserRole!: string | null;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    private toastrService: ToastrService,
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
    console.log(this.currentUserRole);
  }

  checkRoles(roles: string[]) {
    //console.log(roles[0] + " + " + roles[1] + " + " + this.currentUserRole);
    return roles.includes(this.currentUserRole!);
  }

  navigateToLogin(){
    this.router.navigateByUrl('/login');
  }

  navigateToMainmenu(){
    this.router.navigateByUrl('/');
  }

}