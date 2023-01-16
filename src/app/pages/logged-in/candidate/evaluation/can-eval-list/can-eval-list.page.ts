import { Component, OnInit } from '@angular/core';
import {CandidateEvaluationService} from "src/app/providers/logged-in/candidate-evaluation.service";

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

  constructor(
    public candidateEvaluationService: CandidateEvaluationService
  ) { }

  ngOnInit() {
    this.loadData(1);
  }


  loadData(page) {
      let param = '';
    this.candidateEvaluationService.listCandidateEvalReport(page, param).subscribe(response => {
      this.candidateReport = response.body;
      this.currentPage = response.headers.get('X-Pagination-Current-Page');
      this.totalPage = response.headers.get('X-Pagination-Page-Count');
      this.totalRecord = response.headers.get('X-Pagination-Total-Count');
    })
  }
}
