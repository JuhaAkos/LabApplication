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

const routes: Routes = [
  {
    path: 'equipment',
    component: EquipmentListComponent,
    canActivate: [ () => inject(AuthenticationService).preventGuestAccess(),      
    ]    
  },
  {
    path: 'equipment/form/:id',
    component: EquipmentFormComponent
  },
  {
    path: 'equipment/form',
    component: EquipmentFormComponent,
    canActivate: [ () => inject(AuthenticationService).restrictToRolesOf([ 'teacher', 'admin' ]) ]
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },  
  {
    path: 'calendar/form',
    component: CalendarFormComponent
  },
  {
    path: 'calendar/list',
    component: CalendarListComponent
  },
  {
    path: 'experiment',
    component: ExperimentComponent
  },
  {
    path: 'experiment/form',
    component: ExperimentFormComponent
  },
  {
    path: 'experiment/form/:id',
    component: ExperimentFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user/list',
    component: UserListComponent
  },
  {
    path: 'user/form/:id',
    component: UserFormComponent
  },
  {
    path: 'user/form',
    component: UserFormComponent
  }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
