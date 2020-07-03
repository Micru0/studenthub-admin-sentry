import { Component, OnInit } from '@angular/core'; 
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
  
  public loading: boolean = false; 

  public countries: Country[];

  constructor(
    public router: Router,
    public countryService: CountryService
  ) {}

  ngOnInit() {
    this.loadData(this.currentPage);
  }

  /**
   * load country list
   * @param page 
   */
  async loadData(page: number) {
   
    this.loading = true;

    this.countryService.list(page).subscribe(response => {

      this.loading = false;

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.countries = response.body;
    }, 
    () => {
      this.loading = false;
    });
  }

  /**
   * load more countries on scroll 
   * @param event 
   */
  async doInfinite(event) {
   
    this.loading = true;

    this.currentPage++; 

    this.countryService.list(this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = response.headers.get('X-Pagination-Page-Count');
      this.currentPage = response.headers.get('X-Pagination-Current-Page');

      this.countries = this.countries.concat(response.body);

      event.target.complete();
    }, 
    () => {
      this.loading = false;
    });
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
}
