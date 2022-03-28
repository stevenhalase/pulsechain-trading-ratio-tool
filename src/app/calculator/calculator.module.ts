import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculatorPage } from './calculator.page';

import { CalculatorPageRoutingModule } from './calculator-routing.module';
import { components } from '../components';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CalculatorPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CalculatorPage, ...components],
})
export class CalculatorPageModule {}
