import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordHomeComponent } from './forgot-password-home/forgot-password-home.component';

@NgModule({
  declarations: [ForgotPasswordHomeComponent],
  imports: [CommonModule, ForgotPasswordRoutingModule, ReactiveFormsModule],
})
export class ForgotPasswordModule {}
