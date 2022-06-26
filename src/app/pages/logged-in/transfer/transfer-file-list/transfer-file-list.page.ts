import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//services
import { TransferFileService } from 'src/app/providers/logged-in/transfer.file.service';
import { AwsService } from 'src/app/providers/aws.service';
//models
import { TransferFile } from 'src/app/models/transfer-file';
import {AuthService} from "../../../../providers/auth.service";


@Component({
  selector: 'app-transfer-file-list',
  templateUrl: './transfer-file-list.page.html',
  styleUrls: ['./transfer-file-list.page.scss'],
})
export class TransferFileListPage implements OnInit {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public transferFiles: TransferFile[];

  public loading: boolean = false;

  constructor(
    public router: Router,
    public aws: AwsService,
    public transferFileService: TransferFileService,
    public authService: AuthService,

  ) { }

  ngOnInit() {
    window.analytics.page('Transfer File List Page');

    this.loadData(this.currentPage);
  }

  /**
   * Load list of staff
   * @param page 
   */
  async loadData(page: number, silent: boolean = false) {
    
    if(!silent)
      this.loading = true;

    this.transferFileService.list(page).subscribe(response => {

      this.loading = false; 

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.transferFiles = response.body;
    },() => { 
      this.loading = false; 
    });
  }
  
  async doInfinite(event) {
    
    this.loading = true;

    this.currentPage++; 

    this.transferFileService.list(this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.transferFiles = this.transferFiles.concat(response.body);

      event.target.complete(); 

    },() => { 
      this.loading = false; 
    });
  }

  /**
   * When its selected
   */
  rowSelected(model) {
    this.router.navigate(['transfer-file-detail', model.transfer_file_id], {
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
}
