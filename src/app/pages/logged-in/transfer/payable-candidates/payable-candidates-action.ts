import { PopoverController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
    template: `
      <ion-list>
        <ion-item (click)="close('mark-all-paid')" tappable lines="none">
          Mark candidates as paid
        </ion-item>
        <ion-item (click)="close('export')" tappable lines="none">
          Download as Excel
        </ion-item>
        <ion-item (click)="close('export-text')" tappable lines="none">
          Download Transfer File
        </ion-item>
        <ion-item (click)="close('download-advice')" tappable lines="none">
          Download Transfer Advice File
        </ion-item>
        <ion-item (click)="close('export-transfer')" tappable lines="none">
          Download Transfer Excel
        </ion-item>
        <ion-item (click)="close('export-abk-transfer')" tappable lines="none">
          Download ABK Transfer Excel
        </ion-item>
        <ion-item (click)="close('export-abk-payment-advice')" tappable lines="none">
          Download ABK Payment Advice
        </ion-item>
      </ion-list>
    `
})

export class PayableCandidatesActionComponent {

    constructor(public popCtrl: PopoverController) { }

    close(data) {
        this.popCtrl.getTop().then(overlay => {
            if (overlay) {
              this.popCtrl.dismiss({ action: data });
            }
        });
    }
}
