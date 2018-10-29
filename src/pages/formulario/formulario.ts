import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

interface pacientes{
  nombres: string;
  apellidop: string;
  apellidom: string;
  edad: number;
  alergia: string;
  id: string;
  proximaCita: string;
  datosCita: string;
}

@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {
  todoCollection: AngularFirestoreCollection<pacientes>;
  paciente: Observable<pacientes[]>;
  pacient: string;
  clinica: string;
  turno: string;
  revision: string;
  consultorio: any;
  tiempo: string;
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private asf: AngularFirestore) {
  }

  ionViewDidLoad(){
   this.todoCollection = this.asf.collection('pacientes');
   this.paciente = this.todoCollection.valueChanges();
   }

   registrar(){
      const userDoc = this.asf.doc<any>(`pacientes/${this.pacient}`);
      try{
        if(this.clinica != undefined && this.turno != undefined && this.revision != undefined && this.consultorio != undefined){
          const datos = 'Clinica: '+this.clinica+' Turno: '+this.turno+' Revision: '+this.revision+' Consultorio: '+this.consultorio;
          userDoc.update({
            proximaCita: this.tiempo,
            datosCita: datos,
          });
          const alert = this.alertCtrl.create({
            title: 'Cita creada',
            subTitle: 'Se creó la cita médica correctamente',
            buttons: ['Entendido']
          });
          alert.present();
        }
        else{
          const alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Introduce todos los datos.',
            buttons: ['Entendido']
          });
          alert.present();
        }
     }catch(e){
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Ocurrio un error, no se pudo procesar la cita',
          buttons: ['Entendido']
        });
        alert.present();
     }
  }
}
