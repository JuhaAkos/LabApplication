import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { LoginComponent } from './login/login.component';
import { CalendarListComponent } from './calendar-list/calendar-list.component';
import { ExperimentComponent } from './experiment/experiment.component';

const routes: Routes = [
  {
    path: 'equipment',
    component: EquipmentListComponent
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
    path: 'login',
    component: LoginComponent
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
