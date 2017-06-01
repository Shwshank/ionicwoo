import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {HomePage} from '../home/home';
import {CartPage} from '../cart/cart';
import {SettingPage} from '../setting/setting';

@Component({
  selector: 'page-header',
  templateUrl: 'header.html',
})
export class HeaderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  home(){
    this.navCtrl.push(HomePage);
  }
  cart(){
    this.navCtrl.push(CartPage);
  }
  setting(){
    this.navCtrl.push(SettingPage);
  }
  logout(){
      console.log("Loggout called");
  }
}
