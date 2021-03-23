import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, NavController } from '@ionic/angular';
//models
import { TransferCandidate } from 'src/app/models/transfer-candidate';
//services
import { EventService } from 'src/app/providers/event.service';
import { CandidateTransferService } from 'src/app/providers/logged-in/candidate.transfer.service';
import { AwsService } from 'src/app/providers/aws.service';


@Component({
  selector: 'app-candidate-transfer-list',
  templateUrl: './candidate-transfer-list.page.html',
  styleUrls: ['./candidate-transfer-list.page.scss'],
})
export class CandidateTransferListPage implements OnInit {

  public transfersCandidate: TransferCandidate[];

  public tc_id;

  public loading: boolean = false;

  public processing: boolean = false;

  constructor(
    public router: Router,
    public navCtrl: NavController,
    public activatedRoute: ActivatedRoute,
    public _candidateTransferService: CandidateTransferService,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public aws: AwsService,
    private _eventService: EventService
  ) {
    // Passed from Dashboard to show filtered status results
    /*if (params.get('transferCandidateList')) {
      this.transfersCandidate = params.get('transferCandidateList');
    }*/
  }

  ngOnInit() {
    this.tc_id = this.activatedRoute.snapshot.paramMap.get('tc_id');

    this.loadData(1);
  }

  /**
   * Load Transfer List
   * @param page
   */
  async loadData(page: number) {

    this.loading = true;

    this._candidateTransferService.list(this.tc_id).subscribe(async response => {

      this.loading = false;

      this.transfersCandidate = response.body;

      if (this.transfersCandidate.length == 0) {
        let toast = await this.toastCtrl.create({
          message: 'No transfercandidate record with id ' + this.tc_id,
          duration: 3000
        });
        toast.present();
      }
    },
    error => {
      this.loading = false;
    });
  }

  /**
   * mark all unpaid
   */
  async markAllUnpaid() {
    let transferCandidateList = [];

    this.transfersCandidate.forEach((value, index) => {
      if (this.candidatePayableAmount(this.transfersCandidate[index]) > 0 && this.transfersCandidate[index].paid == 1) {
        transferCandidateList.push({
          'tc_id': this.transfersCandidate[index].tc_id,
          'transfer_id': this.transfersCandidate[index].transfer_id
        });
      }
    });

    const alert = await this.alertCtrl.create({
      header: 'Mark All Unpaid',
      message: 'Are you sure you want to unmark ' + transferCandidateList.length + ' transfers as unPaid?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: async () => {

            this.processing = true;

            this._candidateTransferService.markUnPaidAll(transferCandidateList).subscribe(async response => {

              this.processing = false;

              let toast = await this.toastCtrl.create({
                message: response.message,
                duration: 3000
              });
              toast.present();

              //update review count 
              this._eventService.updatePayable$.next();

              //pop
              this.navCtrl.pop();

            }, () => {
              this.processing = false;
            });
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * mark all paid
   */
  async markAllPaid() {
    let transferCandidateList = [];

    this.transfersCandidate.forEach((value, index) => {
      if (this.transfersCandidate[index].paid == 0) {
        transferCandidateList.push({
          'tc_id': this.transfersCandidate[index].tc_id,
          'transfer_id': this.transfersCandidate[index].transfer_id,
          'candidate_id': this.transfersCandidate[index].candidate_id
        });
      }
    });

    const alert = await this.alertCtrl.create({
      header: 'Mark All Paid',
      message: 'Are you sure you want to mark ' + transferCandidateList.length + ' transfers as Paid?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: async () => {

            this.processing = true;

            this._candidateTransferService.markPaidAll(transferCandidateList).subscribe(async response => {

              let toast = await this.toastCtrl.create({
                message: response.message,
                duration: 3000
              });
              toast.present();

              //update review count 
              this._eventService.updatePayable$.next();
              
              this._eventService.markedAllUnpaid$.next({
                transferCandidateList: transferCandidateList
              });

              this.processing = false;

              //pop
              this.navCtrl.pop();

            }, () => {
              this.processing = false;
            });
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * @param model 
   */
  loadTransferDetail(transferCandidate: TransferCandidate) {
    this.router.navigate(['candidate-transfer-detail', transferCandidate.tc_id], {
      state: {
        'transferCandidate': transferCandidate
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
   * @param transfersCandidate 
   */
  candidatePayableAmount(transfersCandidate) {
    return ((parseFloat(transfersCandidate.candidate_hourly_rate) * parseFloat(transfersCandidate.hours)) + parseFloat(transfersCandidate.bonus));
  }
}
