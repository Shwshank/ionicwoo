import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  WooCommerce: any;
  newOrder: any;
  paymentMethods: any[];
  paymentMethod: any;
  billing_shipping_same: boolean;
  userInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public alertCtrl: AlertController) {

    this.newOrder = {};
    this.newOrder.billing_address = {};
    this.newOrder.shipping_address = {};
    this.billing_shipping_same = false;

    this.paymentMethods = [
      { method_id: "bacs", method_title: "Direct Bank Transfer" },
      { method_id: "cheque", method_title: "Cheque Payment" },
      { method_id: "cod", method_title: "Cash on Delivery" },
      { method_id: "paypal", method_title: "PayPal" }];

    this.WooCommerce = WC({
       url: "http://mysite.invidev.com/wp",
       consumerKey: "ck_dd37fed9e9e96e9b282d1ac024990fffc24c533f",
       consumerSecret: "cs_7a39f0d7ba84655fc074ad3cc0a627670f796232"
     });

    this.storage.get("userLoginInfo").then((userLoginInfo) => {

      if(userLoginInfo!=null){

          this.userInfo = userLoginInfo.user;

          let email = userLoginInfo.user.email;

          this.WooCommerce.getAsync("customers/email/" + email).then((data) => {

            this.newOrder = JSON.parse(data.body).customer;

          })
        }
      }, (error)=>{
          console.log(error);
    })

  }

  setBillingToShipping() {
    this.billing_shipping_same = !this.billing_shipping_same;

    if (this.billing_shipping_same) {
      this.newOrder.shipping_address = this.newOrder.billing_address;
    }

  }

  placeOrder() {

    let orderItems: any[] = [];
    let data: any = {};

    let paymentData: any = {};

    this.paymentMethods.forEach((element, index) => {
      if (element.method_id == this.paymentMethod) {
        paymentData = element;
      }
    });


    data = {
      payment_details: {
        method_id: paymentData.method_id,
        method_title: paymentData.method_title,
        paid: true
      },

      billing_address: this.newOrder.billing_address,
      shipping_address: this.newOrder.shipping_address,
      customer_id: this.userInfo.id || '',
      line_items: orderItems
    };

    {

      this.storage.get("cart").then((cart) => {

        cart.forEach((element, index) => {
          orderItems.push({
            product_id: element.product.id,
            quantity: element.qty
          });
        });

        data.line_items = orderItems;

        let orderData: any = {};

        orderData.order = data;

        this.WooCommerce.postAsync("orders", orderData).then((data) => {

          let response = (JSON.parse(data.body).order);

          this.alertCtrl.create({
            title: "Order Placed Successfully",
            message: "Your order has been placed successfully. Your order number is " + response.order_number,
            buttons: [{
              text: "OK",
              handler: () => {
                this.navCtrl.setRoot(HomePage);
              }
            }]
          }).present();

        })

      })

    }


  }
}
