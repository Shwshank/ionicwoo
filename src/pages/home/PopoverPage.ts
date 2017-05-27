import { Component } from '@angular/core';
import { NavController, ToastController, PopoverController, ViewController  } from 'ionic-angular';

@Component({
  template: `
    <ion-list>

        <ion-item text-wrap>
          <ion-thumbnail item-left>
            <ion-icon name="contact" style="font-size: 150px; color: gray"></ion-icon>
          </ion-thumbnail>
          <h3> Rohan Sharma </h3>
        </ion-item>

      <button ion-item (click)="close()">Profile</button>
      <button ion-item (click)="close()">Cart</button>
      <button ion-item (click)="close()">Setting</button>
      <button ion-item (click)="close()">Logout</button>
    </ion-list>
  `
})
export class PopoverPage{
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}
