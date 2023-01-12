import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAccountRoutingModule } from './create-account-routing.module';
import { CreateAccountHomeComponent } from './create-account-home/create-account-home.component';


@NgModule({
  declarations: [
    CreateAccountHomeComponent
  ],
  imports: [
    CommonModule,
    CreateAccountRoutingModule
  ]
})
export class CreateAccountModule { }
