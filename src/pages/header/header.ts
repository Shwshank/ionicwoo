import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer } from 'ionic-angular';

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

  home( fab: FabContainer){
    fab.close();
    this.navCtrl.push(HomePage);
  }
  cart( fab: FabContainer){
    fab.close();
    this.navCtrl.push(CartPage);
  }
  setting( fab: FabContainer){
    fab.close();
    this.navCtrl.push(SettingPage);
  }
  
  logout( fab: FabContainer){
    fab.close();
    console.log("Loggout called");
  }
}
