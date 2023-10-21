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
import { AuthorizationService } from './services/authorization.service';

const routes: Routes = [
  {
    path: 'equipment',
    component: EquipmentListComponent,
    canActivate: [ () => inject(AuthenticationService).preventGuestAccess(),
      () => inject(AuthorizationService).preventNonTeacherAccess() ]    
  },
  {
    path: 'equipment/form/:id',
    component: EquipmentFormComponent
  },
  {
    path: 'equipment/form',
    component: EquipmentFormComponent
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
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user/list',
    component: UserListComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
