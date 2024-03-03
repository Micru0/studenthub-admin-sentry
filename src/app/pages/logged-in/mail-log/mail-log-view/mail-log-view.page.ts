import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import {ModalController} from "@ionic/angular";
//models
import { MailLog } from 'src/app/models/mail-log';
//services
import {AuthService} from "../../../../providers/auth.service";
import { MailLogService } from 'src/app/providers/logged-in/mail-log.service';


@Component({
  selector: 'app-mail-log-view',
  templateUrl: './mail-log-view.page.html',
  styleUrls: ['./mail-log-view.page.scss'],
})
export class MailLogViewPage implements OnInit {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public mail_uuid;

  public mailLog: MailLog; 

  public loading: boolean = false;
 
  constructor(
    private activateRoute: ActivatedRoute,
    public mailLogService: MailLogService,
    public authService: AuthService,
    public _modalCtrl: ModalController
  ) { }

  ngOnInit() {
    window.analytics.page('Mail Log View Page');

    // Load the passed model if available
    if (window['state']) {
      this.mailLog = window['state']['model'];
    }

    this.mail_uuid = this.activateRoute.snapshot.paramMap.get('mail_uuid');

    this.loadData();
  }

  /**
   * load country detail
   */
  loadData() {

    this.loading = true;

    this.mailLogService.view(this.mail_uuid).subscribe(country => {

      this.mailLog = country;
 
      this.loading = false;

    }, () => {

      this.loading = false;
    })
  }

}
