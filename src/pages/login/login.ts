import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string ="";
  password: string ="";

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController, public storage: Storage, public alertCtrl: AlertController) {
  }

  login(){

      this.http.get("http://mysite.invidev.com/wp/api/auth/generate_auth_cookie/?insecure=cool&username=" + this.username + "&password=" + this.password)
      .subscribe( (res) => {
        console.log(res.json());

        let response = res.json();

        if(response.error){
          this.toastCtrl.create({
            message: response.error,
            duration: 3000
          }).present();
          return;
        }


        this.storage.set("userLoginInfo", response).then( (data) =>{

          this.alertCtrl.create({
            title: "Login Successful",
            message: "You have been logged in successfully.",
            buttons: [{
              text: "OK",
              handler: () => {
                if(this.navParams.get("next")){
                  this.navCtrl.push(this.navParams.get("next"));
                } else {
                  this.navCtrl.pop();
                }
              }
            }]
          }).present();
        })
      });
    }

  signup(){
    this.navCtrl.push(SignupPage);
  }

}
