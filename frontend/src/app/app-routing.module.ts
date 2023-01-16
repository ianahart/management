import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [GuestGuard],
    loadChildren: async () => {
      const dynamicImport = await import('./login/login.module');
      return dynamicImport.LoginModule;
    },
  },

  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: async () => {
      const dynamicImport = await import('./dashboard/dashboard.module');
      return dynamicImport.DashboardModule;
    },
  },

  {
    path: 'reset-password',
    canActivate: [GuestGuard],
    loadChildren: async () => {
      const dynamicImport = await import(
        './reset-password/reset-password.module'
      );
      return dynamicImport.ResetPasswordModule;
    },
  },

  {
    path: 'forgot-password',
    canActivate: [GuestGuard],
    loadChildren: async () => {
      const dynamicImport = await import(
        './forgot-password/forgot-password.module'
      );
      return dynamicImport.ForgotPasswordModule;
    },
  },

  {
    path: 'create-account',
    canActivate: [GuestGuard],
    loadChildren: async () => {
      const dynamicImport = await import(
        './create-account/create-account.module'
      );
      return dynamicImport.CreateAccountModule;
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
