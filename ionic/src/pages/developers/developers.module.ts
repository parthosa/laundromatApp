import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Developers } from './developers';

@NgModule({
  declarations: [
    Developers,
  ],
  imports: [
    IonicPageModule.forChild(Developers),
  ],
  exports: [
    Developers
  ]
})
export class DevelopersModule {}
