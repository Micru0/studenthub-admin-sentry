import { Component, OnInit, NgZone } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/logged-in/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  rootPage;

  constructor(
      platform: Platform,
      private _events: Events,
      private _auth: AuthService,
      private _zone: NgZone
  ) {
    platform.ready().then(() => {
        // Native functions
        if (platform.is('cordova') && this._platform.is('mobile')) {
            StatusBar.styleDefault();
            Splashscreen.hide();
        }

        // Figure out which page to load on app start [Based on Auth]
        if(this._auth.isLoggedIn){
            this.rootPage = HomePage;
        }else{
            this.rootPage = LoginPage;
        }
    });
  }

  /**
   * Using Ng2 Lifecycle hooks because view lifecycle events don't trigger for Bootstrapped MyApp Component
   */
  ngOnInit(){
      // On Login Event, set root to Internal app page
      this._events.subscribe('user:login', (userEventData) => {
        this._zone.run(() => {
          this.rootPage = HomePage;
        });
      });

      // On Logout Event, set root to Login Page
      this._events.subscribe('user:logout', (logoutReason) => {
        // Set root to Login Page
        this.rootPage = LoginPage;

        // Show Toast Message explaining logout reason if there's one set
        if(logoutReason){
          console.log(logoutReason);
        }

      });
  }
}
