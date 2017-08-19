import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the addcredits page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-addcredits',
    templateUrl: 'addcredits.html'
})
export class AddCreditsPage {
    nav: NavController;
    state: number = 1;

    constructor(navCtrl: NavController) {
        this.nav = navCtrl;
    }

    back() {
        if (this.state > 1)
            this.state--;
    }

    next() {
        if (this.state < 3)
            this.state++;
    }
}
