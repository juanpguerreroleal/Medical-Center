import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Perfil } from '../../models/perfil';

@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {
  perfil = {} as Perfil;
  pacient: string;
  pacientName: string;
  clinica: string;
  turno: string;
  revision: string;
  consultorio: any;
  tiempo: string;
  userDoc: AngularFirestoreDocument;
  registroDoc: AngularFirestoreDocument;
  tiempoI:String;
  tiempoF:String;
  tiempoC:String;
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private asf: AngularFirestore) {
    this.pacient = window.localStorage.getItem("pacientId");
    this.userDoc = this.asf.doc<any>(`pacientes/${this.pacient}`);
    this.pacientName = window.localStorage.getItem("pacientName");
    this.tiempoI = navParams.get('tiempoInicial');
  }

  registrar(){
    let tiempoF = new Date().getTime()
    //console.log("Tiempo inicial capturado: " + this.tiempoI); <-- Initial time
    //console.log("Tiempo final capturado: " + tiempoF); <-- Current *final time
    try{
      if(this.clinica != undefined && this.turno != undefined && this.revision != undefined && this.consultorio != undefined){
        const datos = 'Clinica: '+this.clinica+' Turno: '+this.turno+' Revision: '+this.revision+' Consultorio: '+this.consultorio + ' Tiempo de consulta: ' + this.diff(tiempoF, this.tiempoI) + ' minuto(s) ';
        this.perfil.medicalARDates = new Array();
        this.perfil.medicalDescriptions = new Array();
        this.userDoc.update({
          nextMADate: this.tiempo,
          nextMADescription: datos
        });
        this.asf.firestore.runTransaction((t) => {
          return t.get(this.userDoc.ref).then((doc) => {
            if (!doc.data().medicalARDates) {
              t.set(this.userDoc.ref, { 'medicalARDates': [this.perfil.medicalARDates] }, { merge: true });
            } else {
              const existingArray = doc.data().medicalARDates;
              existingArray.push(this.tiempo);
              t.set(this.userDoc.ref, { medicalARDates: existingArray }, { merge: true });
            }
          });
        }).then(function () {
          console.log("Transaction successfully committed!");
        }).catch(function (error) {
          console.log("Transaction failed: ", error);
        });
        this.asf.firestore.runTransaction((t) => {
          return t.get(this.userDoc.ref).then((doc) => {
            if (!doc.data().medicalARDescriptions) {
              t.set(this.userDoc.ref, { 'medicalARDescriptions': [this.perfil.medicalDescriptions] }, { merge: true });
            } else {
              const existingArray = doc.data().medicalARDescriptions;
              existingArray.push(datos);
              t.set(this.userDoc.ref, { medicalARDescriptions: existingArray }, { merge: true });
            }
          });
        }).then(function () {
          console.log("Transaction successfully committed!");
        }).catch(function (error) {
          console.log("Transaction failed: ", error);
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
        subTitle: 'Ocurrio un error, no se pudo procesar la cita'+e,
        buttons: ['Entendido']
      });
      alert.present();
    }
  }

  diff(tiempoF, tiempoI){
    console.log(Math.floor((tiempoF - tiempoI)/ 60000));
    return Math.floor((tiempoF - tiempoI)/ 60000)
  }
}
