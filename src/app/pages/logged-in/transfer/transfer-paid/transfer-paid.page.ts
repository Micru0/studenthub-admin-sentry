import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
//services
import { TransferService } from 'src/app/providers/logged-in/transfer.service';
import { EventService } from 'src/app/providers/event.service';


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

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public navCtrl: NavController,
    private _alertCtrl: AlertController,
    private transferService: TransferService,
    public toastCtrl: ToastController,
    private _eventService: EventService
  ) { }

  ngOnInit() {
    window.analytics.page('Transfer Paid Page');

    this.excel = this.activatedRoute.snapshot.paramMap.get('excel');

    this.loadData();
  }
  
  /**
   * Load List of Payable Candidates
   */
  async loadData() {

    this.loading = true;
    
    this.transferService.importExcel(this.excel).subscribe(response => {

      this.total = response.total;

      this.candidatelistData = response.candidates;
    
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

    this.transferService.markPaidAll(candidate_ids, this.excel).subscribe(async response => {

      let toast = await this.toastCtrl.create({
        message: response.message,
        duration: 3000
      });
      toast.present();

      //update review count 
      this._eventService.updatePayable$.next();

      this.navCtrl.navigateRoot(['payable-candidates']);

      this.markingPaid = false;

    }, () => {
      this.markingPaid = false;
    });
  }
}
