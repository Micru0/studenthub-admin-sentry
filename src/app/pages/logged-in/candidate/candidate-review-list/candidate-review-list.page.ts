import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
//services
import { CandidateService } from 'src/app/providers/logged-in/candidate.service';
//models
import { Candidate } from 'src/app/models/candidate';


@Component({
  selector: 'app-candidate-review-list',
  templateUrl: './candidate-review-list.page.html',
  styleUrls: ['./candidate-review-list.page.scss'],
})
export class CandidateReviewListPage implements OnInit {

  public loading: boolean = false; 
  
  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public candidates: Candidate[];

  constructor(
    public router: Router,
    public candidateService: CandidateService
  ) {}

  ngOnInit() {
    this.loadData(this.currentPage);
  }

  /**
   * Load Candidate List
   * @param page 
   */
  async loadData(page: number) {

    this.loading = true; 

    this.candidateService.listToReview(page).subscribe(response => {
      
      this.loading = false; 

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.pages = [];

      for(var i = 1; i <= this.pageCount; i++){
         this.pages.push(i);
      }

      //hide if no page = 1 
      if(this.pageCount == 1)
        this.pages = [];

      this.candidates = response.body;
    }, () => {
      this.loading = false; 
    });
  }

  /**
   * When a candidate is selected
   * @param model 
   */
  rowSelected(model) {
    
    this.router.navigate(['/candidate-view', model.candidate_id], {
      state: {
        'model': model
      }
    });
  }

  /**
   * pagination color
   * @param page 
   */
  pageLinkColor(page: number) {
    if(page == this.currentPage) 
      return 'light';
    
    return '';
  }
}
