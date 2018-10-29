import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{	FormGroup, FormControl} from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-temas',
  templateUrl: 'temas.html',
})
export class TemasPage {
	temas;
	temasForm;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.temasForm = new FormGroup({
  		temas: new FormControl('normal')
  	});
  	console.log(this.temasForm.value);
  }
  onChange($event){
  	console.log(this.temasForm.value);
  	event.preventDefault();
  }

  ionViewDidLoad() {
  }
}
