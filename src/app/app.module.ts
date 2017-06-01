import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { PopoverPage } from '../pages/home/PopoverPage';
import { ProductDetailsPage } from "../pages/product-details/product-details";
import { ProductByCategoryPage } from '../pages/product-by-category/product-by-category';
import { CartPage } from '../pages/cart/cart';
import { HeaderPage } from '../pages/header/header';
import { SettingPage } from '../pages/setting/setting';
import { CheckoutPage } from '../pages/checkout/checkout';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SearchPipe } from '../pages/pipes/searchpipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { AnimationService, AnimatesDirective } from 'css-animator';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    PopoverPage,
    ProductDetailsPage,
    ProductByCategoryPage,
    CartPage,
    AnimatesDirective,
    HeaderPage,
    SettingPage,
    CheckoutPage,
    LoginPage,
    SignupPage,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    PopoverPage,
    ProductDetailsPage,
    ProductByCategoryPage,
    CartPage,
    HeaderPage,
    SettingPage,
    CheckoutPage,
    LoginPage,
    SignupPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AnimationService
  ]
})
export class AppModule {}
