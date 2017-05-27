import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  homePage: Component;
  WooCommerce: any;
  categories: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage;
    this.categories = [];

     this.WooCommerce = WC({
      url: "http://mysite.invidev.com/wp",
      consumerKey: "ck_dd37fed9e9e96e9b282d1ac024990fffc24c533f",
      consumerSecret: "cs_7a39f0d7ba84655fc074ad3cc0a627670f796232"
    });

    this.getCategories();
  }

  getCategories(){
    this.WooCommerce.getAsync("products/categories").then((data) => {
      //console.log(JSON.parse(data.body).product_categories);

      let temp: any[] = JSON.parse(data.body).product_categories;

      for( let i = 0; i < temp.length; i ++){
        if(temp[i].parent == 0){
          this.categories.push(temp[i]);
        }
      }

    }, (err)=> {
      console.log(err)
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
