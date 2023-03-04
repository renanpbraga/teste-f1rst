import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxMaskModule } from 'ngx-mask';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarFinancingComponent } from './modules/financing/car-financing/car-financing.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, CarFinancingComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgxMaskModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
