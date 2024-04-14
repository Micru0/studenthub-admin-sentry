import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
//services
import { AuthService } from 'src/app/providers/auth.service';
import { XeroService } from 'src/app/providers/logged-in/xero.service';


@Component({
  selector: 'app-bank-transactions-sync',
  templateUrl: './bank-transactions-sync.page.html',
  styleUrls: ['./bank-transactions-sync.page.scss'],
})
export class BankTransactionsSyncPage implements OnInit {

  public currentPage = 1;

  constructor(
    public router: Router,
    public alertCtrl: AlertController,
    public authService: AuthService,
    public xeroService: XeroService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.syncTransactions();
  }

  syncTransactions() {
    
    this.xeroService.syncTransactions(this.currentPage).subscribe(async res => {
      if(res.redirect) {
        location = res.redirect;
      } else if(res.error) {
        let prompt = await this.alertCtrl.create({
          message: this.authService.errorMessage(res.message),
          buttons: ["Okay"]
        });
        prompt.present();
      } else if (res.count > 0) {
        this.currentPage++;
        this.syncTransactions()
      } else {
        let prompt = await this.alertCtrl.create({
          message: "Sync finished",
          buttons: ["Okay"]
        });
        prompt.present();

        this.router.navigate(['bank-transactions']);
      }
    });
  }
}
