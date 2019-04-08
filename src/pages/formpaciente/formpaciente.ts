import { Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FormularioPage } from './../formulario/formulario';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

interface pacientes{
  names: string;
  fatherLastName: string;
  motherLastName: string;
  age: number;
  alergy: string;
  id?: string;
}

@IonicPage()
@Component({
  selector: 'page-formpaciente',
  templateUrl: 'formpaciente.html',
})
export class FormpacientePage {
  todoCollection: AngularFirestoreCollection<pacientes>;
  paciente: Observable<pacientes[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private asf: AngularFirestore) {
  }
  ionViewDidLoad(){
   this.todoCollection = this.asf.collection('pacientes');
   this.paciente = this.todoCollection.valueChanges();
  }
  getItems(e){
    if(e.target.value == ""){
      this.todoCollection = this.asf.collection('pacientes');
    }
    else{
      /*this.todoCollection = this.asf.collection('pacientes');
      this.paciente = this.paciente.forEach((pacients) => {
        return (pacients.filter( (pacient) => {
          return (pacient.names.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
        }))
      });*/
      this.todoCollection = this.asf.collection('pacientes', ref => ref.where('names', '==', e.target.value));
    }
    this.paciente = this.todoCollection.valueChanges();
  }
  add(id, name){
    window.localStorage.setItem("pacientId", id);
    window.localStorage.setItem("pacientName", name);
    this.navCtrl.push(FormularioPage);
  }
  /*
  add(){
    this.navCtrl.push(FormularioPage);
  }*/
}
