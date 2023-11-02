import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { LoginComponent } from './login/login.component';
import { CalendarListComponent } from './calendar-list/calendar-list.component';
import { ExperimentComponent } from './experiment/experiment.component';
import { AuthenticationService } from './services/authentication.service';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ExperimentFormComponent } from './experiment-form/experiment-form.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { GroupListComponent } from './group-list/group-list.component';
import { CalendarNewweekComponent } from './calendar-newweek/calendar-newweek.component';

const routes: Routes = [
  {
    path: 'equipment',
    component: EquipmentListComponent,
    //canActivate: [ () => inject(AuthenticationService).preventGuestAccess(), ]
    canActivate: [ () => inject(AuthenticationService).restrictToRolesOf([ 'teacher', 'admin' ]) ]       
  },
  {
    path: 'equipment/form/:id',
    component: EquipmentFormComponent,
    canActivate: [ () => inject(AuthenticationService).restrictToRolesOf([ 'teacher', 'admin' ]) ] 
  },
  {
    path: 'equipment/form',
    component: EquipmentFormComponent,
    canActivate: [ () => inject(AuthenticationService).restrictToRolesOf([ 'teacher', 'admin' ]) ]
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [ () => inject(AuthenticationService).preventGuestAccess(), ]
  },  
  {
    path: 'calendar/form',
    component: CalendarFormComponent,
    canActivate: [ () => inject(AuthenticationService).restrictToRolesOf([ 'teacher', 'admin' ]) ] 
  },
  {
    path: 'calendar/list',
    component: CalendarListComponent,
    canActivate: [ () => inject(AuthenticationService).restrictToRolesOf([ 'teacher', 'admin' ]) ] 
  },
  {
    path: 'calendar/newweek',
    component: CalendarNewweekComponent,
    canActivate: [ () => inject(AuthenticationService).restrictToRolesOf([ 'admin' ]) ]
  },
  {
    path: 'experiment',
    component: ExperimentComponent,
    canActivate: [ () => inject(AuthenticationService).preventGuestAccess(), ]
  },
  {
    path: 'experiment/form',
    component: ExperimentFormComponent,
    canActivate: [ () => inject(AuthenticationService).restrictToRolesOf([ 'teacher', 'admin' ]) ] 
  },
  {
    path: 'experiment/form/:id',
    component: ExperimentFormComponent,
    canActivate: [ () => inject(AuthenticationService).restrictToRolesOf([ 'teacher', 'admin' ]) ] 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user/list',
    component: UserListComponent,
    canActivate: [ () => inject(AuthenticationService).restrictToRolesOf([ 'admin' ]) ] 
  },
  {
    path: 'user/form/:id',
    component: UserFormComponent,    
    canActivate: [ () => inject(AuthenticationService).restrictToRolesOf([ 'teacher', 'admin' ]) ] 
  },
  {
    path: 'user/form',
    component: UserFormComponent,
    canActivate: [ () => inject(AuthenticationService).restrictToRolesOf([ 'teacher', 'admin' ]) ] 
  }, 
  {
    path: 'group/form',
    component: GroupFormComponent,
    canActivate: [ () => inject(AuthenticationService).restrictToRolesOf([ 'teacher', 'admin' ]) ] 
  }, 
  {
    path: 'group/form/:id',
    component: GroupFormComponent,
    canActivate: [ () => inject(AuthenticationService).restrictToRolesOf([ 'teacher', 'admin' ]) ] 
  },
  {
    path: 'group/list',
    component: GroupListComponent,
    canActivate: [ () => inject(AuthenticationService).restrictToRolesOf([ 'teacher', 'admin' ]) ] 
  }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
