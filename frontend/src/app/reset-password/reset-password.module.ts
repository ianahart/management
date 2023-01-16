import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordHomeComponent } from './reset-password-home/reset-password-home.component';

@NgModule({
  declarations: [ResetPasswordHomeComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ResetPasswordRoutingModule,
  ],
})
export class ResetPasswordModule {}
