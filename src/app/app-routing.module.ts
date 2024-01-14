import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationModule } from './authentication/authentication.module';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'auth', loadChildren: () => import('src/app/authentication/authentication.module').then(a => a.AuthenticationModule)},
  {path: 'dashboard', loadChildren: () => import('src/app/dashboard/dashboard.module').then(a => a.DashboardModule)},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
