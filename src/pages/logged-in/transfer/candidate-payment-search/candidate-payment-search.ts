import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams,ToastController } from 'ionic-angular';

//Pages
import { CandidateTransferDetailPage } from '../../transfer/candidate-transfer-detail/candidate-transfer-detail';
import { CandidateTransferListPage } from '../../transfer/candidate-transfer-list/candidate-transfer-list';

// Providers
import { CandidateTransferService } from '../../../../providers/logged-in/candidate.transfer.service';

// Models
import { TransferCandidate } from '../../../../models/transfer-candidate';

@Component({
    selector: 'page-candidate-payment-search',
    templateUrl: 'candidate-payment-search.html'
})

export class CandidatePaymentSearchPage {
    public transferID: number = 0;

    public pageCount = 0;
    public currentPage = 1;
    public pages: number[] = [];

    public transfersCandidate: TransferCandidate[];

    constructor(
        public navCtrl: NavController,
        params: NavParams,
        public _candidateTransferService: CandidateTransferService,
        private _loadingCtrl: LoadingController,
        public toastCtrl: ToastController
    ) {}

    ionViewWillEnter() {}

    /**
     * Load Transfer List
     * @param page
     */
    loadData(page: number) {
        let loader = this._loadingCtrl.create();
        loader.present();

        this._candidateTransferService.list(this.transferID, page).subscribe(response => {
                let responsedata = response.json();
                if (responsedata.length > 0 ) {
                    if (responsedata.length > 1 ) {
                        this.candidateTransferList(responsedata);
                    } else {
                        this.candidateTransferDetails(responsedata[0]);
                    }
                } else {
                    let toast = this.toastCtrl.create({
                        message: 'No transfercandidate record with id '+this.transferID,
                        duration: 3000
                    });
                    toast.present();
                }
            },
            error => {},
            () => {loader.dismiss();}
        );
    }

    /**
     * Page link color for pagination
     * @param page
     */
    pageLinkColor(page: number) {
        if(page == this.currentPage)
            return 'light';

        return '';
    }
    /**
     *
     * @param transferDetail
     */
    candidateTransferDetails(transferDetail: any) {
        this.navCtrl.push(CandidateTransferDetailPage, {
            'transfers': transferDetail
        });
    }
    /**
     *
     * @param transferDetail
     */
    candidateTransferList(transferDetail: any) {
        this.navCtrl.push(CandidateTransferListPage, {
            'transfers': transferDetail
        });
    }
}