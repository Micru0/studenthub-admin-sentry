import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/models/candidate';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidateTransferService } from 'src/app/providers/logged-in/candidate.transfer.service';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { EventService } from 'src/app/providers/event.service';
import { TransferCandidate } from 'src/app/models/transfer-candidate';

@Component({
  selector: 'app-candidate-transfer-detail',
  templateUrl: './candidate-transfer-detail.page.html',
  styleUrls: ['./candidate-transfer-detail.page.scss'],
})
export class CandidateTransferDetailPage implements OnInit {

  public transferCandidate: TransferCandidate;

  public tc_id;

  public loading: boolean = false;

  public markingPaid: boolean = false;
  
  public markingUnPaid: boolean = false;

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _candidateTransferService: CandidateTransferService,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private _eventService: EventService
  ) { }

  ngOnInit() {
    // Passed from Dashboard to show filtered status results

    // Load the passed model if available
    if(window['state']) {
      this.transferCandidate = window['state']['transferCandidate'];
    }

    this.tc_id = this.activatedRoute.snapshot.paramMap.get('tc_id');

    if(!this.transferCandidate) {
      this.loadData();
    }
  }

  ionViewWillEnter() {}

  /**
   * load transfer detail 
   */
  loadData() {
    this.loading = true; 

    this._candidateTransferService.view(this.tc_id).subscribe(response => {
   
      this.loading = false; 

      this.transferCandidate = response;
    })
  }

  /**
   * mark individual as unpaid
   */
  async markUnPaid () {

   const alert = await this.alertCtrl.create({
    header: 'Mark Unpaid',
    message: 'Are you sure you want to mark this transfer candidate as unpaid?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: async () => {
          
          this.markingUnPaid = true;

          this._candidateTransferService.unpaid(this.transferCandidate).subscribe(async response => {
            
            let toast = await this.toastCtrl.create({
              message: response.message,
              duration: 3000
            });
            toast.present();

            //update review count 
            this._eventService.updatePayable$.next(this.transferCandidate);
            
            this.markingUnPaid = false;

            this.navCtrl.pop();

          }, () => {
            this.markingUnPaid = false;
          });
        }
      }
    ]
    });
    alert.present(); 
  }

  /**
   * mark single transfer candiate as paid
   */
  async markPaid () {
   const alert = await this.alertCtrl.create({
    header: 'Mark Paid',
    message: 'Are you sure you want to mark this transfer candidate as Paid?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: async () => {
          
          this.markingPaid = true;

          this._candidateTransferService.paid(this.transferCandidate).subscribe(async response => {
            
            let toast = await this.toastCtrl.create({
              message: response.message,
              duration: 3000
            });
            toast.present();

            //update review count 
            this._eventService.updatePayable$.next(this.transferCandidate);
            
            this.markingPaid = false;

            this.navCtrl.pop();
          }, () => {
            this.markingPaid = false;
          });
        }
      }
    ]
    });
    alert.present(); 
  }

  /**
   * On Candidate Selected
   * @param model 
   */
  loadCandidateDetail(model: Candidate) {
    this.router.navigate(['candidate-view', model.candidate_id], {
      state: {
        'model': model
       }
    });
  }
  
  /**
   * candidate payable amount
   * @param transferCandidate 
   */
  candidatePayableAmount(transferCandidate) {
    return  ((parseFloat(transferCandidate.candidate_hourly_rate) * parseFloat(transferCandidate.hours)) + parseFloat(transferCandidate.candidate_bonus));
  }
}
