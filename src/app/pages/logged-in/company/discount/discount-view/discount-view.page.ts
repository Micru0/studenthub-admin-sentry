import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
//models
import { Discount } from 'src/app/models/discount';
//services
import { AwsService } from 'src/app/providers/aws.service';
import { DiscountService } from 'src/app/providers/logged-in/discount.service';


@Component({
  selector: 'app-discount-view',
  templateUrl: './discount-view.page.html',
  styleUrls: ['./discount-view.page.scss'],
})
export class DiscountViewPage implements OnInit {

  public model: Discount;

  public loading: boolean = false; 

  constructor(
    public modalCtrl: ModalController,
    public discountService: DiscountService,
    public aws: AwsService
  ) { }

  ngOnInit() {
  }

  loadData() {
    this.loading = true; 

    this.discountService.view(this.model.discount_uuid).subscribe(res => {
      this.model = res;

      this.loading = false;
    })
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
