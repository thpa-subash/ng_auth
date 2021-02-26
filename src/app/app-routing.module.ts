import { AuthGuardsGuard } from './Guards/auth-guards.guard';
import { EmailVerifyComponent } from './Auth/email-verify/email-verify.component';
import { RegisterComponent } from './Auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './Auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardsGuard],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'email-verification', component: EmailVerifyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
