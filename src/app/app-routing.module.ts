import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
