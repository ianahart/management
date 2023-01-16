import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordHomeComponent } from './forgot-password-home/forgot-password-home.component';
const routes: Routes = [{ path: '', component: ForgotPasswordHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordRoutingModule {}
