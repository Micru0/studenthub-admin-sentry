import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, NavController } from '@ionic/angular';
//services
import { CandidateTransferService } from 'src/app/providers/logged-in/candidate.transfer.service';
import { EventService } from 'src/app/providers/event.service';
import { AwsService } from 'src/app/providers/aws.service'; 
import {AuthService} from "../../../../providers/auth.service";
//models
import { Candidate } from 'src/app/models/candidate';
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

  public payingToWallet: boolean = false; 
  
  constructor(
    public navCtrl: NavController,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _candidateTransferService: CandidateTransferService,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public aws: AwsService,
    private _eventService: EventService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    window.analytics.page('Transfer Detail Page');

    // Passed from Dashboard to show filtered status results

    // Load the passed model if available
    if(window['state']) {
      this.transferCandidate = window['state']['transferCandidate'];
    }

    this.tc_id = this.activatedRoute.snapshot.paramMap.get('tc_id');

    //if(!this.transferCandidate) {
      this.loadData();
    //}
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
  async markUnPaid (e) {
    e.preventDefault();
    e.stopPropagation();

   const alert = await this.alertCtrl.create({
    header: 'Mark Unpaid',
    message: 'Are you sure you want to mark this transfer candidate as unpaid?',
    buttons: [
      {
        text: 'No',
        role: 'cancel'
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
            
            this._eventService.markedUnpaid$.next(this.transferCandidate);

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
   * mark single transfer candiate as paid + add amount to wallet
   */
   async payToWallet(e) {
    e.preventDefault();
    e.stopPropagation();
    
   const alert = await this.alertCtrl.create({
    header: 'Pay by wallet',
    message: 'Are you sure you want to mark this transfer candidate as Paid and pay by wallet?',
    buttons: [
      {
        text: 'No',
        role: 'cancel'
      },
      {
        text: 'Yes',
        handler: async (data) => {
          
          this.payingToWallet = true;

          this._candidateTransferService.payByWallet(this.transferCandidate).subscribe(async response => {
            
            let toast = await this.toastCtrl.create({
              message: response.message,
              duration: 3000
            });
            toast.present();

            //update review count 
            this._eventService.updatePayable$.next(this.transferCandidate);
            
            this.payingToWallet = false;

            if (response.operation == "success") {
              this.transferCandidate.paid = 1;
            }

            this.navCtrl.pop();
          }, () => {
            this.payingToWallet = false;
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
  async markPaid (e) {
    e.preventDefault();
    e.stopPropagation();
    
    let inputs = [];

    if(!this.transferCandidate.transfer_confirmation_id) {
      inputs = [
        {
          name: 'transfer_confirmation_id',
          type: 'text',
          required: true,
          placeholder: 'Enter Confirmation ID'
        },
      ];
    }

   const alert = await this.alertCtrl.create({
    header: 'Mark Paid',
    message: 'Are you sure you want to mark this transfer candidate as Paid?',
    inputs: inputs,
    buttons: [
      {
        text: 'No',
        role: 'cancel'
      },
      {
        text: 'Yes',
        handler: async (data) => {
          
          //if no transfer confirmation id get it from input 

          if(!this.transferCandidate.transfer_confirmation_id) {
            this.transferCandidate.transfer_confirmation_id = data.transfer_confirmation_id;
          }

          //if no confirmation id provided 

          if(!this.transferCandidate.transfer_confirmation_id) {
            return null; 
          }

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
            
            if (response.operation == "success") {
              this.transferCandidate.paid = 1;
            }

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
   * Make date readable by Safari
   * @param date
   */
  toDate(date) {
    if (date)
      return new Date(date.replace(/-/g, '/'));
  }
  
  /**
   * click me to do nothing
   * @param event 
   */
  doNothing(event) {
    //event.preventDefault();
    event.stopPropagation();
  }

  /**
   * candidate payable amount
   * @param transferCandidate 
   */
  candidatePayableAmount(transferCandidate) {
    return transferCandidate.candidate_total; 
    //((parseFloat(transferCandidate.candidate_hourly_rate) * parseFloat(transferCandidate.hours)) + parseFloat(transferCandidate.candidate_bonus));
  }
}
