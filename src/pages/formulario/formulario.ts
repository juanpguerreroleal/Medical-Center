import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Perfil } from '../../models/perfil';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from "rxjs/Rx";

@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {
  perfil = {} as Perfil;
  pacient: string;
  medic: string;
  pacientName: string;
  clinica: string;
  cont: number = 0;
  turno: string;
  revision: string;
  consultorio: any;
  tiempo: string;
  time: number;
  note: string;
  userDoc: AngularFirestoreDocument;
  medicDoc: AngularFirestoreDocument;
  registroDoc: AngularFirestoreDocument;
  tiempoI:String;
  tiempoF:String;
  tiempoC:String;
  userOb: Observable<Perfil>;
  timeValue: number;
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private asf: AngularFirestore) {
    this.pacient = window.localStorage.getItem("pacientId");
    this.medic = window.localStorage.getItem("uid");
    this.userDoc = this.asf.doc<any>(`pacientes/${this.pacient}`);
    this.medicDoc = this.asf.doc<any>(`medicos/${this.medic}`);
    this.pacientName = window.localStorage.getItem("pacientName");
    this.tiempoI = navParams.get('tiempoInicial');
    setInterval(function(){this.timeValue = Math.floor((new Date().getTime() - this.tiempoI)/ 60000)}, 100);
    this.getDocData().subscribe( res => {
      this.time = res.averageTime;
    });
    this.showReminder();
  }
  updateData(){
    if(this.time < this.diff(new Date().getTime(), this.tiempoI) && this.cont < 1){
      this.showAlert();
      this.cont++;
    }
  }
  async showAlert(){
    let alert =  await this.alertCtrl.create({
      message: "Estas excediendo el tiempo de consulta",
      buttons: ['Cancel','OK']
    });
    await alert.present();
  }
  async showReminder(){
    let alert =  await this.alertCtrl.create({
      message: "Recuerde crear la cita hasta que concluya la cita actual.",
      buttons: ['Cancel','OK']
    });
    await alert.present();
  }
  getDocData(){
    this.userOb = this.medicDoc.snapshotChanges().pipe(
      map( actions => {
      const data = actions.payload.data() as Perfil;
      const id = actions.payload.id;
      return { id, ...data};
    }));
    return this.userOb;
  }
  registrar(){
    let tiempoF = new Date().getTime()
    try{
      if(this.clinica != undefined && this.turno != undefined && this.revision != undefined && this.consultorio != undefined){
        const datos = 'Clinica: '+this.clinica+' Turno: '+this.turno+' Revision: '+this.revision+' Consultorio: '+this.consultorio;
        this.perfil.medicalARDates = new Array();
        this.perfil.medicalARDescriptions = new Array();
        this.userDoc.update({
          nextMADate: this.tiempo,
          nextMADescription: datos
        });
        this.asf.firestore.runTransaction((t) => {
          return t.get(this.userDoc.ref).then((doc) => {
            if (!doc.data().medicalARDates) {
              this.perfil.medicalARDates.push(this.tiempo);
              console.log(this.perfil.medicalARDates);
              t.set(this.userDoc.ref, { 'medicalARDates': this.perfil.medicalARDates }, { merge: true });
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
              this.perfil.medicalARDescriptions.push(datos);
              console.log(this.perfil.medicalARDescriptions);
              t.set(this.userDoc.ref, { 'medicalARDescriptions': this.perfil.medicalARDescriptions }, { merge: true });
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
        //Correct
        this.asf.firestore.runTransaction((t) => {
          return t.get(this.userDoc.ref).then((doc) => {
              t.set(this.userDoc.ref, { 'note': this.note }, {merge: true})
          });
        }).then(function () {
          console.log("Transaction successfully committed!");
        }).catch(function (error) {
          console.log("Transaction failed: ", error);
        });
        //Correct
        this.asf.firestore.runTransaction((t) => {
          return t.get(this.medicDoc.ref).then((doc) => {
            if (!doc.data().averageTime) {
              t.set(this.medicDoc.ref, { 'averageTime': this.diff(tiempoF, this.tiempoI) }, { merge: true });
            } else {
              const existingArray = (doc.data().averageTime + this.diff(tiempoF, this.tiempoI))/2;
              t.set(this.medicDoc.ref, { averageTime: existingArray }, { merge: true });
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
        subTitle: 'Ocurrio un error, no se pudo procesar la cita',
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
