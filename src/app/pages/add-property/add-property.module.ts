import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPropertyPageRoutingModule } from './add-property-routing.module';

import { AddPropertyPage } from './add-property.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPropertyPageRoutingModule,RouterModule.forChild([{ path: '', component: AddPropertyPage }])
  ],
  declarations: [AddPropertyPage]
})
export class AddPropertyPageModule {}
