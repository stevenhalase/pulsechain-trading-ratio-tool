import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupportPage } from './support.page';

import { SupportPageRoutingModule } from './support-routing.module';
import { components } from '../components';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SupportPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [SupportPage, ...components],
})
export class SupportPageModule {}
