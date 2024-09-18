import { Component, OnInit } from '@angular/core';
import { YeasterService } from 'src/app/providers/logged-in/yeaster.service';

@Component({
  selector: 'app-voice-mail-list',
  templateUrl: './voice-mail-list.page.html',
  styleUrls: ['./voice-mail-list.page.scss'],
})
export class VoiceMailListPage implements OnInit {

  public processing;

  public voiceMails = [];

  currentPage
  pageCount
  total

  loading

  constructor(public yeaster: YeasterService) { }

  ngOnInit() {
    window.analytics.page('Voicemail List Page');

    this.loading = true;

    this.yeaster.list(1, 20).subscribe(res => {
      this.voiceMails = res.data;
      this.currentPage = res.page;
      this.pageCount = res.totalPages;
      this.total = res.total;

      this.loading = false;
    })
  }

  doInfinite(event) {

    this.loading = true;

    this.currentPage++;

    this.yeaster.list(this.currentPage, 20).subscribe(res => {

      this.loading = false;
 
      this.currentPage = res.page;
      this.pageCount = res.totalPages;
      this.total = res.total;
       
      this.voiceMails = this.voiceMails.concat(res.data);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }
}
