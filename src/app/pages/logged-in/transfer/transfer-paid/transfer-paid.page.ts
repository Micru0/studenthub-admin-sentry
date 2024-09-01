import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
//services
import { TransferService } from 'src/app/providers/logged-in/transfer.service';
import { EventService } from 'src/app/providers/event.service';
import { AuthService } from 'src/app/providers/auth.service';


@Component({
  selector: 'app-transfer-paid',
  templateUrl: './transfer-paid.page.html',
  styleUrls: ['./transfer-paid.page.scss'],
})
export class TransferPaidPage implements OnInit {

  public candidatelistData = [];

  public markingPaid: boolean = false; 
  public loading: boolean = false;

  public total;

  public excel: string; 
  public bank: string; 

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public navCtrl: NavController,
    private _alertCtrl: AlertController,
    public authService: AuthService,
    private transferService: TransferService,
    public toastCtrl: ToastController,
    private _eventService: EventService
  ) { }

  ngOnInit() {
    window.analytics.page('Transfer Paid Page');

    this.excel = this.activatedRoute.snapshot.paramMap.get('excel');
    this.bank = this.activatedRoute.snapshot.paramMap.get('bank');

    this.loadData();
  }
  
  /**
   * Load List of Payable Candidates
   */
  async loadData() {

    this.loading = true;
    
    let action;
    if (this.bank == "AUB") {
      action = this.transferService.importExcel(this.excel);
    } else {
      action = this.transferService.importKFHExcel(this.excel);
    }

    action.subscribe(async response => {

      if (response.operation == "success") {
        this.total = response.total;

        this.candidatelistData = response.candidates;
      } else {
        const alert = await this._alertCtrl.create({
          header: 'Error',
          message: this.authService.errorMessage(response.message),
          buttons: ['Okay']
        });
  
        await alert.present();

        this.navCtrl.back();
      }

      this.loading = false;
    },
    () => {
      this.loading = false;
    });
  } 

  /**
   * Mark Paid
   */
  async markPaid() {

    if(!this.candidatelistData) {
      return false;
    }
    
    let candidate_ids = [];

    this.candidatelistData.forEach((value, index) => {
        if(value != false) {
          candidate_ids.push({
              'candidate_id':this.candidatelistData[index].candidate_id,
              'transfer_id':this.candidatelistData[index].transfer_id,
              'tc_id':this.candidatelistData[index].tc_id,
              'transfer_confirmation_id':this.candidatelistData[index].transfer_confirmation_id,
            }
          );
        }
    });

    if (candidate_ids.length == 0) {

        let prompt = await this._alertCtrl.create({
          message: 'Please select candidate(s)',
          buttons: ["Ok"]
        });
        prompt.present();

        return false;
    }  

    if(this.markingPaid) {
      return false;
    }

    this.markingPaid = true;

    this.transferService.markPaidAll(candidate_ids, this.excel, this.bank).subscribe(async response => {

      if (response.operation == "success") {
        let toast = await this.toastCtrl.create({
          message: this.authService.errorMessage(response.message),
          duration: 3000
        });
        toast.present();

        //update review count 
        this._eventService.updatePayable$.next({});

        this.navCtrl.navigateRoot(['payable-candidates']);
      } else {
        let alert = await this._alertCtrl.create({
          header: "Error",
          subHeader: "Please re-check and correct uploaded excel!",
          message: this.authService.errorMessage(response.message),
          buttons: ['Okay']
        });
        alert.present();
      }

      this.markingPaid = false;

    }, () => {
      this.markingPaid = false;
    });
  }
  
  /**
   * Make date readable by Safari
   * @param date
   */
  toDate(date) {
    if (date) {
      return new Date(date.replace(/-/g, '/'));
    }
  }
}
