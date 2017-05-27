import { Component } from '@angular/core';
import { NavController, ToastController, PopoverController  } from 'ionic-angular';

import * as WC from 'woocommerce-api';

import { PopoverPage } from './PopoverPage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  categories: any[];
  products: any[];
  page: number;
  splash = true;

  constructor(public navCtrl: NavController, private  toastCtrl: ToastController, public popoverCtrl: PopoverController) {
    this.categories = [];

     this.WooCommerce = WC({
      url: "http://mysite.invidev.com/wp",
      consumerKey: "ck_dd37fed9e9e96e9b282d1ac024990fffc24c533f",
      consumerSecret: "cs_7a39f0d7ba84655fc074ad3cc0a627670f796232"
    });

    this.getCategories();
    this.getProducts();
    this.loadMoreProducts(null);
  }
    ionViewDidLoad() {
      setTimeout(() => this.splash = false, 6500);
    }

    getCategories(){
      this.WooCommerce.getAsync("products/categories").then((data) => {
        console.log(JSON.parse(data.body).product_categories);
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

    getProducts(){
      this.WooCommerce.getAsync("products").then( (data) => {
            console.log(JSON.parse(data.body));
            this.products = JSON.parse(data.body).products;
          }, (err) => {
            console.log(err)
          })
    }

    loadMoreProducts(event){
      console.log(event);
      if(event == null)
      {
        this.page = 2;
        this.products = [];
      }
      else
        this.page++;

      this.WooCommerce.getAsync("products?page=" + this.page).then( (data) => {
        console.log(JSON.parse(data.body));
        this.products = this.products.concat(JSON.parse(data.body).products);

        if(event != null)
        {
          event.complete();
        }
        if(JSON.parse(data.body).products.length < 10){
            event.enable(false);

            this.toastCtrl.create({
              message: "No more products!",
              duration: 5000
            }).present();
          }
        }, (err) => {
          console.log(err)
        })
      }

    presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(PopoverPage);
      popover.present({
        ev: myEvent
      });
    }

}
