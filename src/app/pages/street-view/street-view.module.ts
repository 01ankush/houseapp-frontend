import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StreetViewPageRoutingModule } from './street-view-routing.module';

import { StreetViewPage } from './street-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StreetViewPageRoutingModule
  ],
  declarations: [StreetViewPage]
})
export class StreetViewPageModule {}
