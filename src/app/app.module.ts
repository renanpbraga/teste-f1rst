import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonLoadingComponent } from './components/button-loading/button-loading.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { CarFinancingComponent } from './modules/financing/car-financing/car-financing.component';
import { MainComponent } from './modules/main/main.component';
import { ToastrModule } from 'ngx-toastr';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { SignUpSuccessComponent } from './modules/auth/sign-up/components/sign-up-success/sign-up-success.component';
import { HomeComponent } from './modules/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    CarFinancingComponent,
    SignInComponent,
    ButtonLoadingComponent,
    SignUpComponent,
    SignUpSuccessComponent,
    HomeComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 20000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
