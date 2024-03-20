import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {CandidateEvaluationService} from "src/app/providers/logged-in/candidate-evaluation.service";
import {EvaluationReportViewPage} from "../evaluation-report-view/evaluation-report-view.page";
import {StaffPage} from "../../../picker/staff/staff.page";
import {CandidatePage} from "../../../picker/candidate/candidate.page";

@Component({
  selector: 'app-can-eval-list',
  templateUrl: './can-eval-list.page.html',
  styleUrls: ['./can-eval-list.page.scss'],
})
export class CanEvalListPage implements OnInit {

  public candidateReport: any[];

  public loading = false;
  public currentPage = 1;
  public totalPage = 0;
  public totalRecord = 0;
  public showFilter= false;
  public filters : {
    staff: string,
    staffID: number,
    candidate: string,
    candidateID: number
    departmentID: number
  } = {
    staff: null,
    staffID: null,
    candidate: null,
    candidateID: null,
    departmentID: null
  }
  constructor(
    public candidateEvaluationService: CandidateEvaluationService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loadData(1);
  }

  showFilterPanel() {
    this.showFilter = !this.showFilter;
  }

  loadData(page) {
    let param = '&expand=department,staff,candidate' + this.urlParam();
    this.candidateEvaluationService.listCandidateEvalReport(page, param).subscribe(response => {
      this.candidateReport = response.body;
      this.currentPage = response.headers.get('X-Pagination-Current-Page');
      this.totalPage = response.headers.get('X-Pagination-Page-Count');
      this.totalRecord = response.headers.get('X-Pagination-Total-Count');
    })
  }

  /**
   * load more
   * @param ev
   */
  onIonInfinite(ev) {
    this.currentPage ++ ;
    this.loading = true;
    let param = '&expand=department,staff,candidate' + this.urlParam();
    this.candidateEvaluationService.listCandidateEvalReport(this.currentPage, param).subscribe(response => {
      this.candidateReport = this.candidateReport.concat(response.body);
      this.totalPage = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');
      this.totalRecord = response.headers.get('X-Pagination-Total-Count');
      this.loading = false;
      ev.target.complete();
    })
  }

  /**
   * view detail
   * @param report
   */
  async viewDetail(report) {

    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this.modalCtrl.create({
      component: EvaluationReportViewPage,
      componentProps: {
        report,
      }
    });
    modal.present();
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }
    });

    // const { data } = await modal.onWillDismiss();
  }

  resetFilter() {
    this.filters  = {
      staff: null,
      staffID: null,
      candidate: null,
      candidateID: null,
      departmentID: null
    }
    this.loadData(1);
  }

  urlParam() {
    let url = '';
    if (this.filters.staffID) {
      url += '&staffID='+this.filters.staffID;
    }

    if (this.filters.candidateID) {
      url += '&candidateID='+this.filters.candidateID;
    }
    if (this.filters.departmentID) {
      url += '&departmentID='+this.filters.departmentID;
    }

    return url;
  }

  /**
   * Loads form to initiate a new transfer
   */
  async selectStaff(event) {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this.modalCtrl.create({
      component: StaffPage,
      componentProps: {
        popup: true
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }
      if (e.data) {
        this.filters.staff = e.data.staff_name;
        this.filters.staffID = e.data.staff_id;
      }
    });
    modal.present();
  }

  /**
   * Loads form to initiate a new transfer
   */
  async selectCandidate(event) {
    window.history.pushState({ navigationId: window.history.state.navigationId }, null, window.location.pathname);

    const modal = await this.modalCtrl.create({
      component: CandidatePage,
      componentProps: {
        popup: true
      }
    });
    modal.onDidDismiss().then(e => {

      if (!e.data || e.data.from != 'native-back-btn') {
        window['history-back-from'] = 'onDidDismiss';
        window.history.back();
      }
      if (e.data) {
        this.filters.candidate = e.data.candidate_name;
        this.filters.candidateID = e.data.candidate_id;
      }
    });
    modal.present();
  }

  async downloadPdf($event, report) {
    $event.preventDefault();
    $event.stopPropagation();
    const loading = await this.loadingCtrl.create();
    loading.present();
    let candidateName = report.candidate.candidate_name.replaceAll(' ', '-').toLowerCase();
    let dept = report.department.replaceAll(' ', '-').toLowerCase();
    let name = `${candidateName}_${dept}-report`;
    this.candidateEvaluationService.downloadReport(report.can_eval_uuid,name).subscribe(() => {
      },err => loading.dismiss(),
      () => loading.dismiss()
    )
  }

}
