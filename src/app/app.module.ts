import { LOCALE_ID, DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonLoadingComponent } from './components/button-loading/button-loading.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { MainComponent } from './modules/main/main.component';
import { ToastrModule } from 'ngx-toastr';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { SignUpSuccessComponent } from './modules/auth/sign-up/components/sign-up-success/sign-up-success.component';
import { HomeComponent } from './modules/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VehicleFinancingComponent } from './modules/financing/vehicle-financing/vehicle-financing.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMaskModule } from 'ngx-mask';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { DatePickerModule } from './components/date-picker/date-picker.module';
import { VehicleFinancingStepThreeComponent } from './modules/financing/vehicle-financing/components/step-three/vehicle-financing-step-three.component';
import { VehicleFinancingStepOneComponent } from './modules/financing/vehicle-financing/components/step-one/vehicle-financing-step-one.component';
import { VehicleFinancingStepTwoComponent } from './modules/financing/vehicle-financing/components/step-two/vehicle-financing-step-two.component';

registerLocaleData(ptBr);
defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    SignInComponent,
    ButtonLoadingComponent,
    SignUpComponent,
    SignUpSuccessComponent,
    HomeComponent,
    VehicleFinancingComponent,
    VehicleFinancingStepOneComponent,
    VehicleFinancingStepTwoComponent,
    VehicleFinancingStepThreeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DatePickerModule,
    NgxMaskModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 20000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' },
  { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },],
  bootstrap: [AppComponent],
})
export class AppModule {}
