import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Update } from './update';

@NgModule({
  declarations: [
    Update,
  ],
  imports: [
    IonicPageModule.forChild(Update),
  ],
  exports: [
    Update
  ]
})
export class UpdateModule {}
