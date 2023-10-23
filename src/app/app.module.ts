import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
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
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { CalendarListComponent } from './calendar-list/calendar-list.component';
import { ExperimentComponent } from './experiment/experiment.component';
import { AccessTokenInterceptor } from './services/access-token.interceptor';
import { UnauthorizedInterceptor } from './services/unauthorized.interceptor';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ExperimentFormComponent } from './experiment-form/experiment-form.component';

@NgModule({
  declarations: [
    AppComponent,
    EquipmentListComponent,
    EquipmentFormComponent,
    CalendarComponent,
    LoginComponent,
    CalendarFormComponent,
    CalendarListComponent,
    ExperimentComponent,
    UserListComponent,
    UserFormComponent,
    ExperimentFormComponent
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
    DeviceFormService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
