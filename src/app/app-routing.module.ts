import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { CarFinancingComponent } from './modules/financing/car-financing/car-financing.component';
import { HomeComponent } from './modules/home/home.component';
import { MainComponent } from './modules/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'auth/sign-in',
        component: SignInComponent,
      },
      {
        path: 'auth/sign-up',
        component: SignUpComponent,
      },
      {
        path: 'financing/car',
        component: CarFinancingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
