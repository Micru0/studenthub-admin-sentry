import { Component, OnInit } from '@angular/core';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { TransferBankAdvice } from 'src/app/models/trabsfer-bank-advice';
import { AuthService } from 'src/app/providers/auth.service';
import { AwsService } from 'src/app/providers/aws.service';
import { TransferBankAdviceService } from 'src/app/providers/logged-in/transfer-bank-advice.service';

@Component({
  selector: 'app-transfer-bank-advice',
  templateUrl: './transfer-bank-advice.page.html',
  styleUrls: ['./transfer-bank-advice.page.scss'],
})
export class TransferBankAdvicePage implements OnInit {

  public loading = false;

  public deleting = false;

  public pageCount = 0;
  public currentPage = 1;

  public transferBankAdvices: TransferBankAdvice[];

  constructor(
    public platform: Platform,
    public awsService: AwsService,
    public transferBankAdviceService: TransferBankAdviceService,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService
  ) { }

  ngOnInit() {
    window.analytics.page('Transfer Bank Advice List Page');

    this.loadData(this.currentPage);
  }

  /**
   * list banks
   * @param page
   */
  async loadData(page: number, silent = false) {

    if (!silent) {
      this.loading = true;
    }

    this.transferBankAdviceService.list(page).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.transferBankAdvices = response.body;
    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  doInfinite(event) {

    this.loading = true;

    this.currentPage++;

    this.transferBankAdviceService.list(this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.transferBankAdvices = this.transferBankAdvices.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  
  /**
   * Delete the provided model
   */
  async delete(ev, model: TransferBankAdvice) {

    ev.preventDefault();
    ev.stopPropagation();

    const confirm = await this._alertCtrl.create({
      header: 'Delete Bank Advice?',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.deleting = true;

            this.transferBankAdviceService.delete(model).subscribe(async jsonResp => {

              if (jsonResp.operation == 'error') {

                this.deleting = false;

                const alert = await this._alertCtrl.create({
                  header: 'Deletion Error!',
                  subHeader: jsonResp.message,
                  buttons: ['OK']
                });
                alert.present();
              }

              if (jsonResp.operation == 'success') {
                const toast = await this._toastCtrl.create({
                  message: jsonResp.message,
                  duration: 3000
                });
                toast.present();

                this.loadData(this.currentPage, true);
              }
            }, () => {
              this.deleting = false;
            });
          }
        },
        {
          text: 'No'
        }
      ]
    });
    confirm.present();
  }
}
