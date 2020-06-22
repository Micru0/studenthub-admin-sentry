import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
//services
import { CandidateTransferService } from 'src/app/providers/logged-in/candidate.transfer.service';
//models
import { TransferCandidate } from 'src/app/models/transfer-candidate';


@Component({
    selector: 'app-candidate-payment-search',
    templateUrl: './candidate-payment-search.page.html',
    styleUrls: ['./candidate-payment-search.page.scss'],
})
export class CandidatePaymentSearchPage implements OnInit {

    public tc_id: number;

    public pageCount = 0;
    public currentPage = 1;
    public pages: number[] = [];

    public transfersCandidate: TransferCandidate[];

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public _candidateTransferService: CandidateTransferService,
        private _loadingCtrl: LoadingController,
        public toastCtrl: ToastController
    ) { }

    ngOnInit() {
    }

    /**
     * Load Transfer List
     * @param page
     */
    async loadData(page: number) {

        let loader = await this._loadingCtrl.create();
        loader.present();

        this._candidateTransferService.list(this.tc_id).subscribe(async response => {

            let responsedata = response.body;
            
            if (responsedata.length > 0) {
                if (responsedata.length > 1) {
                    this.TransferCandidateList(responsedata);
                } else {
                    this.TransferCandidateDetails(responsedata[0]);
                }
            } else {
                let toast = await this.toastCtrl.create({
                    message: 'No transfercandidate record with id ' + this.tc_id,
                    duration: 3000
                });
                toast.present();
            }
        },
            error => { },
            () => { loader.dismiss(); }
        );
    }

    /**
     * Page link color for pagination
     * @param page
     */
    pageLinkColor(page: number) {
        if (page == this.currentPage)
            return 'light';

        return '';
    }
    /**
     * transfer detail page redirect
     * @param transferCandidate
     */
    TransferCandidateDetails(transferCandidate: TransferCandidate) {
        this.router.navigate(['candidate-transfer-detail', transferCandidate.tc_id], {
            state: {
                'transferCandidate': transferCandidate
            }
        });
    }

    /**
     * transfer list page redirect
     * @param transferCandidateList
     */
    TransferCandidateList(transferCandidateList: TransferCandidate[]) {
        this.router.navigate(['candidate-transfer-list', this.tc_id], {
            state: {
                'transferCandidateList': transferCandidateList
            }
        });
    }
}