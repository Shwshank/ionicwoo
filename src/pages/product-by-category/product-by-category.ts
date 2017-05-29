import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as WC from 'woocommerce-api';

import { ProductDetailsPage } from '../product-details/product-details';

@Component({
  selector: 'page-product-by-category',
  templateUrl: 'product-by-category.html',
})
export class ProductByCategoryPage {

  WooCommerce : any;
  products : any[] =[];
  category : any;
  page: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.category = this.navParams.get("category");
    this.page = 1;

    this.WooCommerce = WC({
     url: "http://mysite.invidev.com/wp",
     consumerKey: "ck_dd37fed9e9e96e9b282d1ac024990fffc24c533f",
     consumerSecret: "cs_7a39f0d7ba84655fc074ad3cc0a627670f796232"
   });

   this.getProducts();
   //this.loadMoreProducts(null);
  }

  ionViewDidLoad(){
      setTimeout(function(){}, 3000);
  }

  getProducts(){
    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then( (data) => {
          console.log(JSON.parse(data.body));
          this.products = JSON.parse(data.body).products;
        }, (err) => {
          console.log(err)
        })
  }


  // loadMoreProducts(event) {
  //   this.page++;
  //   console.log("Getting page " + this.page);
  //   this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" + this.page).then((data) => {
  //     let temp = (JSON.parse(data.body).products);
  //
  //     this.products = this.products.concat(JSON.parse(data.body).products)
  //     console.log(this.products);
  //     event.complete();
  //
  //     if (temp.length < 10)
  //       event.enable(false);
  //   })
  // }

  productDetails(product){
      this.navCtrl.push(ProductDetailsPage, {"product": product} );
  }
}
