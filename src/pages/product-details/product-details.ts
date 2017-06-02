import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController, ViewController, Navbar  } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CartPage } from '../cart/cart';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
    product : any[];
    productInCart: boolean = false;
    AddToCart: any = " Add to Cart ";
    @ViewChild('navbar') navBar: Navbar;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, public storage2: Storage,  public storage: Storage, private toastCtrl: ToastController ) {
    this.product = this.navParams.get("product");
    console.log(this.product);

  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter called");
    this.checkProductInCart(this.product);
  }

  addToCart(product){


    this.storage.get("cart").then((data) => {

      if (data == null || data.length == 0) {
        data = [];

        data.push({
          "product": product,
          "qty": 1,
          "amount": parseFloat(product.price)
        })
      } else {

        let added = 0;

        for (let i = 0; i < data.length; i++) {

          if (product.id == data[i].product.id) {
            let qty = data[i].qty;

            console.log("This product is in your cart! ");

            data[i].qty = qty + 1;
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
            added = 1;
          }
        }

        if (added == 0) {
          data.push({
            "product": product,
            "qty": 1,
            "amount": parseFloat(product.price)
          })

        }
      }

      this.storage.set("cart", data).then(() => {
        console.log("Cart Updated");
        console.log(data);
        this.checkProductInCart(this.product);

        this.toastCtrl.create({
          message: "Cart Updated",
          duration: 2000
        }).present();
      })
    })
  }

  checkProductInCart(product){
      console.log("checking product");
      this.storage2.get("cart").then((data2) => {

        if (data2 == null || data2.length == 0) {
          console.log("No product in cart "+ this.productInCart);
           this.productInCart = false;
           this.AddToCart = " Add to Cart ";
           console.log("No product in cart "+ this.productInCart);
        }
        else {
          console.log("On else block");
          for (let i = 0; i < data2.length; i++) {
            if (product.id == data2[i].product.id){
               this.productInCart = true;
               this.AddToCart = "Already added! Add one more";
               console.log("Product in cart "+ this.productInCart);
            }
            else{
                console.log("This product is not in cart "+ this.productInCart);
                this.productInCart = false;
                this.AddToCart = " Add to Cart ";
                console.log("This product is not in cart "+ this.productInCart);
            }
          }
        }
    });
  }

  openCart(){
      //this.modalCtrl.create(CartPage).present();
      //console.log("Gya ye : "+this.product);
      this.navCtrl.push(CartPage,{'product':this.product}).then(() => {
        // first we find the index of the current view controller:
        const index = this.viewCtrl.index;
        // then we remove it from the navigation stack

        // this.navCtrl.remove(index);  //  <----- ********** Removes current page from stach of pages. **********

      });;

  }

  showAddedMsg(){
    this.toastCtrl.create({
      message: "This product is in your cart! ",
      duration: 2000
    }).present();
  }
}
