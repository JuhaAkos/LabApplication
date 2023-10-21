import { Component, HostListener } from '@angular/core';
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

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    private toastrService: ToastrService) { }

  logout() {
    this.authenticationService.removeToken();
    this.router.navigateByUrl('/');
    this.toastrService.success('Sikeresen kijelentkezett.', 'Kilépés');
  }

  ngOnInit(){
    console.log("c");
  }

  /*
  ngOnDestroy(){
    console.log("byebye");
    this.logout();
  }
  */

  /*
  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event: any) {
    this.logout();
  }
  */
}