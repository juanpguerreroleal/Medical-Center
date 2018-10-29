import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormpacientePage } from './formpaciente';

@NgModule({
  declarations: [
    FormpacientePage,
  ],
  imports: [
    IonicPageModule.forChild(FormpacientePage),
  ],
})
export class FormpacientePageModule {}
