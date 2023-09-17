import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { TransferService } from './services/transfer.service';
import { ChemicalFormService } from './equipment-form/chemicalForm-service';
import { WoodenToolFormService } from './equipment-form/woodenToolForm-service';
import { MetalToolFormService } from './equipment-form/metalToolForm-service';
import { DeviceFormService } from './equipment-form/deviceForm-service';
import { GlassContainerFormService } from './equipment-form/glassContainerForm-service';
import { OtherItemFormService } from './equipment-form/otherItemForm-service';


@NgModule({
  declarations: [
    AppComponent,
    EquipmentListComponent,
    EquipmentFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    TransferService,
    ChemicalFormService,
    WoodenToolFormService,
    MetalToolFormService,
    GlassContainerFormService,
    OtherItemFormService,
    DeviceFormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
