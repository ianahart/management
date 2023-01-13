import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAccountRoutingModule } from './create-account-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateAccountHomeComponent } from './create-account-home/create-account-home.component';

@NgModule({
  declarations: [CreateAccountHomeComponent],
  imports: [
    CommonModule,
    CreateAccountRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class CreateAccountModule {}
