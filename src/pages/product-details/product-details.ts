import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { CartPage } from '../cart/cart';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
    product : any[];
    productInCart: boolean = false;
    AddToCart: any = " Add to Cart ";

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, public storage2: Storage,  public storage: Storage, private toastCtrl: ToastController ) {
    this.product = this.navParams.get("product");
    console.log(this.product);
    this.checkProductInCart(this.product);
  }

  addToCart(product) {

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

            console.log("Product is already in the cart");

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

        this.toastCtrl.create({
          message: "Cart Updated",
          duration: 3000
        }).present();
      })
    })
  }

  checkProductInCart(product){
    this.storage2.get("cart").then((data2) => {

      if (data2 == null || data2.length == 0) {
         this.productInCart = false;
         this.AddToCart = " Add to Cart ";
         console.log(this.productInCart);
      } else {

        for (let i = 0; i < data2.length; i++) {
          if (product.id == data2[i].product.id){
             this.productInCart = true;
             this.AddToCart = "Already added! Add one more";
             console.log(this.productInCart);
          }
        }
      }
  });
}

  openCart(){
    this.modalCtrl.create(CartPage).present();
  }

  showAddedMsg(){
    this.toastCtrl.create({
      message: "Product Already Added!",
      duration: 4000
    }).present();
  }
}
