import { Observable } from 'rxjs';
import { User } from './../../models/user';
import { Perfil } from '../../models/perfil';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from "angularfire2/database";
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast, AlertController } from 'ionic-angular';
import { TabsPage } from './../../pages/tabs/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  user = {} as User;
  public alergyForm: FormGroup;
  public type: number;
  private nCount: number = 0;
  perfil = {} as Perfil;
 
  constructor(private afAuth: AngularFireAuth, private asFire:AngularFirestore, private formBuilder: FormBuilder,
    public navCtrl: NavController, public navParams: NavParams, public alrtCtrl: AlertController, private AfDatabase: AngularFireDatabase) {
      this.alergyForm = formBuilder.group({
        n0: ['', Validators.required]
      });
      this.type = 2;
  }

  async registro(user: User, perfil: Perfil, alergyForm: FormGroup ){
  try {
    this.perfil.alergy = new Array();
    for (var control in alergyForm.controls) {
      this.perfil.alergy.push(alergyForm.get(control.toString()).value);
    }
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).catch(function(error){
      var errorCode = error.code;
      if(errorCode = "auth/weak-password"){
        const alert = this.alrtCtrl.create({
        title: 'Error',
        subTitle: 'Ocurrio un error.',
        message: "Tu contraseña es muy debil, asegurate de que incluya letras mayusculas, minusculas y digitos.",
        buttons: ['OK']
        });
        return alert.present();
      }
      else if(errorCode = "auth/email-already-in-use"){
        const alert = this.alrtCtrl.create({
        title: 'Error',
        subTitle: 'Ocurrio un error.',
        message: "El correo que intentas utilizar ya se encuentra registrado.",
        buttons: ['OK']
        });
        return alert.present();
      }
    });
    if(result && this.type == 2){
      this.perfil.email = result.user.email;
      this.perfil.id = result.user.uid;
      const id = this.asFire.collection('pacientes').doc(result.user.uid).set(
        {
          id: perfil.id,
          names: perfil.names,
          fatherLastName: perfil.fatherLastName,
          motherLastName: perfil.motherLastName,
          age: perfil.age,
          email: perfil.email,
          alergy: perfil.alergy,
          nextMADate: "",
          nextMADescription: "",
          nextMANotes: "",
          MAstatus: false,
          medicalARDates: new Array(),
          medicalDescriptions: new Array()
        }
      );
      const log = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      const alert = await this.alrtCtrl.create({
      title: 'Registro exitoso',
      subTitle: 'Usted es nuevo usuario de MediCenter',
      message: "Su correo y contraseña han sido registrados correctamente.",
      buttons: ['OK']
      });
      this.navCtrl.pop();
      return alert.present();
    }
    else if(result && this.type == 1){
      this.perfil.email = result.user.email;
      this.perfil.id = result.user.uid;
      const id = this.asFire.collection('medicos').doc(result.user.uid).set(
        {
          id: perfil.id,
          names: perfil.names,
          fatherLastName: perfil.fatherLastName,
          motherLastName: perfil.motherLastName,
          age: perfil.age,
          email: perfil.email,
          alergy: perfil.alergy
        }
      );
      const log = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      const alert = await this.alrtCtrl.create({
      title: 'Registro exitoso',
      subTitle: 'Usted es nuevo usuario de MediCenter',
      message: "Su correo y contraseña han sido registrados correctamente.",
      buttons: ['OK']
      });
      this.navCtrl.pop();
    }
    else{
      const alert = await this.alrtCtrl.create({
      title: 'Error',
      subTitle: 'Ocurrio un error.',
      message: "Revisa que hayas escrito una contraseña valida, es decir, que incluya letras mayusculas, minusculas y digitos.",
      buttons: ['OK']
      });
      return await alert.present();
    }
    
  }
  catch (e){
    const alert = await this.alrtCtrl.create({
    title: 'Error',
    subTitle: 'ERROR.',
    message: e,
    buttons: ['OK']
    });
    return await alert.present();
    }
  }

  addControl(){
    this.nCount++;
    this.alergyForm.addControl('n'+this.nCount, new FormControl('', Validators.required));
  }

  removeControl(control){
    this.alergyForm.removeControl(control.key);
  }
}
