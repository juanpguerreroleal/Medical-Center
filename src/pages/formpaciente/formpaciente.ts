import { Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FormularioPage } from './../formulario/formulario';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

interface pacientes{
  nombres: string;
  apellidop: string;
  apellidom: string;
  edad: number;
  alergia: string;
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


  add(){
    this.navCtrl.push(FormularioPage);
  }
}
