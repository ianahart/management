import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () => {
      const dynamicImport = await import('./login/login.module');
      return dynamicImport.LoginModule;
    },
  },

  {
    path: 'create-account',
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
