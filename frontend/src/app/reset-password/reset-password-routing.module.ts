import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordHomeComponent } from './reset-password-home/reset-password-home.component';

const routes: Routes = [{ path: '', component: ResetPasswordHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordRoutingModule {}
