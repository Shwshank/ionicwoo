import { Component } from '@angular/core';
import { ViewController  } from 'ionic-angular';

@Component({
  template: `
    <ion-list no-lines text-center>

        <ion-item text-wrap>
          <ion-thumbnail item-left>
            <ion-icon name="contact" style="font-size: 120px; color: gray"></ion-icon>
          </ion-thumbnail>
          <h3> Rohan Sharma </h3>
        </ion-item>

      <button ion-item text-justify (click)="close()"><ion-icon name="cart"></ion-icon> Cart </button>
      <button ion-item text-justify (click)="close()"><ion-icon name="settings"></ion-icon> Setting </button>
      <button ion-item text-justify (click)="close()"><ion-icon name="lock"></ion-icon> Logout</button>
    </ion-list>
  `
})
export class PopoverPage{
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}
