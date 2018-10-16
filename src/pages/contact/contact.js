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
var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactPage.prototype.show = function (opcion) {
        switch (opcion) {
            case 1:
                this.navCtrl.push(DesarrolladoresPage);
                break;
            default:
                // Nothing
                break;
        }
    };
    ContactPage = __decorate([
        Component({
            selector: 'page-contact',
            templateUrl: 'contact.html'
        }),
        __metadata("design:paramtypes", [NavController])
    ], ContactPage);
    return ContactPage;
}());
export { ContactPage };
var DesarrolladoresPage = /** @class */ (function () {
    function DesarrolladoresPage() {
    }
    DesarrolladoresPage = __decorate([
        Component({
            template: "\n<ion-header>\n  <ion-navbar color=\"beauty\">\n    <ion-title>\n      Contacto\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-list no-border>\n    <ion-list-header>\n      Sigue nuestro proyecto\n    </ion-list-header>\n    <ion-item>\n      <ion-icon name=\"logo-github\" item-start></ion-icon>\n      https://github.com/arcantu97/Mcenter\n    </ion-item>\n  </ion-list>\n</ion-content>\n\t"
        })
    ], DesarrolladoresPage);
    return DesarrolladoresPage;
}());
export { DesarrolladoresPage };
//# sourceMappingURL=contact.js.map