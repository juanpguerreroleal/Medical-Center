var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
var Mapa = /** @class */ (function () {
    function Mapa(navCtrl) {
        this.navCtrl = navCtrl;
    }
    Mapa.prototype.ionViewDidEnter = function () {
        //Set latitude and longitude of some place
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 25.73236, lng: -100.33527 },
            zoom: 15
        });
    };
    Mapa = __decorate([
        Component({
            selector: 'page-mapa',
            templateUrl: 'mapa.html'
        }),
        __metadata("design:paramtypes", [NavController])
    ], Mapa);
    return Mapa;
}());
export { Mapa };
//# sourceMappingURL=mapa.js.map