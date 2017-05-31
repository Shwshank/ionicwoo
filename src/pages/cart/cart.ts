import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Navbar  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProductDetailsPage } from '../product-details/product-details';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartItems: any[] = [];
  total: any;
  showEmptyCartMessage: boolean = false;
  product1 :any[];
  @ViewChild('navbar') navBar: Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public viewCtrl: ViewController) {
    this.product1 = this.navParams.get("product");
    this.total = 0.0;

    this.storage.ready().then(()=>{

      this.storage.get("cart").then( (data)=>{
        this.cartItems = data;
        console.log(this.cartItems);

        if(this.cartItems.length > 0){

          this.cartItems.forEach( (item, index)=> {
            this.total = this.total + (item.product.price * item.qty)
          })

        } else {

          this.showEmptyCartMessage = true;

        }


      })

    })


  }

  ionViewDidEnter() {
    this.navBar.backButtonClick = () => {
      this.navCtrl.push(ProductDetailsPage, {"product": this.product1});
    };

  }

  removeFromCart(item, i){

    let price = item.product.price;
    let qty = item.qty;

    this.cartItems.splice(i, 1);

    this.storage.set("cart", this.cartItems).then( ()=> {

      this.total = this.total - (price * qty);

    });

    if(this.cartItems.length == 0){
      this.showEmptyCartMessage = true;
    }


  }

  closeModal(){
    this.navCtrl.push(ProductDetailsPage, {"product": this.product1});
  }

  productDetails(product){
      this.navCtrl.push(ProductDetailsPage, {"product": product} );
  }

  backToProduct(){
    this.navCtrl.push(ProductDetailsPage, {"product": this.product1});
  }

  ionViewWillLeave() {
    //this.navCtrl.push(ProductDetailsPage, {"product": this.product1});
  }
}
