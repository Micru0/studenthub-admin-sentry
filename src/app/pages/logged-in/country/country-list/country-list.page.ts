import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
//models
import { Country } from 'src/app/models/country';
//services
import { CountryService } from 'src/app/providers/logged-in/country.service';


@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.page.html',
  styleUrls: ['./country-list.page.scss'],
})
export class CountryListPage implements OnInit {

  public pageCount = 0;
  public currentPage = 1;
  public pages: number[] = [];

  public countries: Country[];

  constructor(
    public router: Router,
    public countryService: CountryService,
    private _loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    this.loadData(this.currentPage);
  }

  /**
   * load country list
   * @param page 
   */
  async loadData(page: number) {
   
    let loader = await this._loadingCtrl.create();
    loader.present();

    this.countryService.list(page).subscribe(response => {

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.pages = [];

      for(var i = 1; i <= this.pageCount; i++){
         this.pages.push(i);
      }

      //hide if no page = 1 

      if(this.pageCount == 1)
        this.pages = [];

      this.countries = response.body;
    },
    error => {},
    () => {loader.dismiss();}
    );
  }

  /**
   * When its selected
   */
  rowSelected(model) {
    this.router.navigate(['country-view', model.country_id], {
      state: {
        'model': model
      }
    });
  }

  /**
   * pagination current page color
   * @param page 
   */
  pageLinkColor(page: number) {

    if(page == this.currentPage) 
      return 'light';
    
    return '';
  }
}
