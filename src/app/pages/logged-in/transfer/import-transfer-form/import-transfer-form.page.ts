import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, IonContent, NavController } from "@ionic/angular";
import { Subscription } from 'rxjs';
//services
import { AwsService } from 'src/app/providers/aws.service';
import { SentryErrorhandlerService } from 'src/app/providers/sentry.errorhandler.service';


@Component({
  selector: 'app-import-transfer-form',
  templateUrl: './import-transfer-form.page.html',
  styleUrls: ['./import-transfer-form.page.scss'],
})
export class ImportTransferFormPage implements OnInit {

  // Html Content
  @ViewChild(IonContent) content: IonContent;

  // File input used for browser fallback when no capacitor is available
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  
  public browserUploadSubscription: Subscription;

  public uploading: Boolean = false; 

  constructor(
    public navCtrl: NavController,
    public awsService: AwsService,
    public sentryService: SentryErrorhandlerService,
    private _alertCtrl: AlertController,
  ) { 
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (!!this.browserUploadSubscription) {
      this.browserUploadSubscription.unsubscribe();
    }
  }

  upload() {
    this.fileInput.nativeElement.click();
  }

  /**
   * Upload photo from browser
   * @param event
   */
  async browserUpload(event) {

    const fileList: FileList = event.target.files;

    if (fileList.length == 0) {
      return false;
    }

    this.uploading = true;

    this.browserUploadSubscription = this.awsService.uploadFile(fileList[0]).subscribe(event => {

      this.uploading = false;
      
      this._handleUpload(event);

    }, async err => {

      //log to slack/sentry to know how many user getting file upload error 

      this.sentryService.handleError(err);

      if (this.fileInput && this.fileInput.nativeElement)
        this.fileInput.nativeElement.value = null;

      const alert = await this._alertCtrl.create({
        header: 'Error',
        message: 'Error while uploading file!',
        buttons: ['Okay']
      });

      await alert.present();

      this.uploading = false;
    });
  }

  /**
   * Handle successfull file upload
   * @param event
   */
  _handleUpload(event) {

    // Via this API, you get access to the raw event stream.
    // Look for upload progress events.
    if (event.type === 'progress') {
      // This is an upload progress event. Compute and show the % done:
      // this.progress = Math.round(100 * event.loaded / event.total);
    } else if (event.Key && event.Key.length > 0) {

      if (this.fileInput && this.fileInput.nativeElement)
        this.fileInput.nativeElement.value = null;

        this.navCtrl.navigateForward(['transfer-paid', event.Key]);
    }
  }
}
