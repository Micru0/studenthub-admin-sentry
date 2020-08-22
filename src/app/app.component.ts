import { Component, OnInit, ApplicationRef } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { interval, concat } from 'rxjs';
import { first } from 'rxjs/operators';
import { Platform, AlertController, NavController, ToastController } from '@ionic/angular';
import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
//services
import { EventService } from './providers/event.service';
import { AuthService } from './providers/auth.service';
import { CandidateService } from './providers/logged-in/candidate.service';


const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  
  public updatesAvailable: boolean = false;

  public totalCandidateToReview: number = 0;
  public totalPayableCandidate: number = 0;

  constructor(
    public updates: SwUpdate,
    public appRef: ApplicationRef,
    private platform: Platform,
    public navCtrl: NavController,
    public _toastCtrl: ToastController,
    public _alertCtrl: AlertController,
    public authService: AuthService,
    public eventService: EventService,
    public candidateService: CandidateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
   
    this.platform.ready().then(() => {

      if (this.platform.is('hybrid')) {
        SplashScreen.hide();
      }

      this.totalToReview();

      this.setServiceWorker();
    });
  }

  /**
   * Using Ng2 Lifecycle hooks because view lifecycle events don't trigger for Bootstrapped MyApp Component
   */
  async ngOnInit() {
    this.eventService.totalCandidateToReview$.subscribe(() =>  {
      this.totalToReview();
    });
  
    this.eventService.updatePayable$.subscribe(() =>  {
      this.totalToReview();
    });

    this.eventService.error404$.subscribe(data => {
      this.navCtrl.navigateForward(['not-found']);
    });
    
    this.eventService.error500$.subscribe(data => {
        this.navCtrl.navigateForward(['server-error'], {
          state: {
            message: data? data['message']: null
          }
        });
    });

    // Check for network connection
    this.eventService.internetOffline$.subscribe(async () => {
      let alert = await this._alertCtrl.create({
        header: 'No Internet Connection',
        subHeader: 'Sorry, no Internet connectivity detected. Please reconnect and try again.',
        buttons: ['Dismiss']
      });
      alert.present();

      this.navCtrl.navigateForward(['/no-internet']);
    });

    // On Login Event, set root to Internal app page
    this.eventService.userLogin$.subscribe(userEventData => {
      this.navCtrl.navigateRoot(['/']);
    });

    // On Logout Event, set root to Login Page
    this.eventService.userLogout$.subscribe((logoutReason) => {
      // Set root to Login Page
      this.navCtrl.navigateRoot(['/login']);

      // Show Message explaining logout reason if there's one set
      if (logoutReason) {
        console.log(logoutReason);
        console.log('Invalid Access');
      }
    });
  }

  /**
   * change theme
   */
  changeTheme() {
    if (!this.authService.theme || this.authService.theme == 'day') {
      this.authService.setTheme('night');
    } else {
      this.authService.setTheme('day');
    }
  }

  setServiceWorker() {

      // service worker watcher
      // && window.location.hostname != 'localhost'
      if (!this.platform.is('capacitor')) {

        if ('serviceWorker' in navigator && environment.serviceWorker) {

          navigator.serviceWorker.register('./ngsw-worker.js');

          // Allow the app to stabilize first, before starting polling for updates with `interval()`.
          const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
          const updateInterval$ = interval(1000);// every minute 60
          const updateIntervalOnceAppIsStable$ = concat(appIsStable$, updateInterval$);

          updateIntervalOnceAppIsStable$.subscribe(() => {
            this.updates.checkForUpdate().then((e) => {
            });
          });

          this.updates.available.subscribe((e) => {
            console.log(e);
            this.updatesAvailable = true;
          });

          this.updates.activated.subscribe((e) => {
            this.updatesAvailable = false;
          }, reason => {
            console.error('service worker update activation failed', reason);
          });
        }
      }
  }

  /**
   * When user select refresh on udpate available prompt
   */
  onUpdateAlertRefresh() {

    if (!this.updatesAvailable) {
      return this.updatesAvailable = false;
    }

    try {
      this.updates.activateUpdate().then(() => {
      });
    } catch {
    }

    window.location.reload();
  }

  /**
   * When user select close on udpate available prompt
   */
  onUpdateAlertClose() {
    this.updatesAvailable = false;
  }

  /**
   * Get total required to review
   */
  totalToReview() {
    this.candidateService.totalToReview().subscribe(result => {
      this.totalCandidateToReview = result.total;
      this.totalPayableCandidate = result.payable;
    });
  }
}

