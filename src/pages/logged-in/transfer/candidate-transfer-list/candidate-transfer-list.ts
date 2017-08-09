import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams,ToastController } from 'ionic-angular';

//Pages
import {CandidateTransferDetailPage} from '../../transfer/candidate-transfer-detail/candidate-transfer-detail';

// Providers
import { CandidateTransferService } from '../../../../providers/logged-in/candidate.transfer.service';

// Models
import { TransferCandidate } from '../../../../models/transfer-candidate';

@Component({
    selector: 'page-candidate-transfer-list',
    templateUrl: 'candidate-transfer-list.html'
})
export class CandidateTransferListPage {
    public transferID: number = 0;
    public candidate_id: number = 0;

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
    ) {
    }
    ionViewWillEnter() {}

    /**
     * Load Transfer List
     * @param page
     */
    loadData(page: number) {
        let loader = this._loadingCtrl.create();
        loader.present();

        this._candidateTransferService.list(this.transferID,this.candidate_id, page).subscribe(response => {
                let responsedata = response.json();
                if (responsedata.length> 0 ) {
                    this.candidateTransferDetails(responsedata);
                } else {
                    let toast = this.toastCtrl.create({
                        message: 'No Data Found',
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
}