import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, Platform } from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
// services
import { AuthService } from 'src/app/providers/auth.service';
import { CompanyService } from 'src/app/providers/logged-in/company.service';
import {PermissionService} from 'src/app/providers/logged-in/permission.service';
import {Staff} from "../../../../../models/staff";
import {StaffService} from "../../../../../providers/logged-in/staff.service";
// pages

@Component({
  selector: 'app-assign-permission',
  templateUrl: './assign-permission.page.html',
  styleUrls: ['./assign-permission.page.scss'],
})
export class AssignPermissionPage implements OnInit {

  public deleting = false;
  public loading = false;
  public loadingCompanies = false;
  public userPermission: { [key: string]: boolean } = {};
  public companyPermissions: { [key: string]: number[] } = {};
  public companies: any[] = [];
  public companySearchTerms: { [key: string]: string } = {}; // sectionId -> searchTerm
  public filteredCompanies: { [key: string]: any[] } = {}; // sectionId -> companies[]

  public totalCount = 0;
  public pageCount = 0;
  public currentPage = 1;
  public exporting = false;

  public permissionSection: any[] = [];

  public staff: Staff;

  public user_id;
  public type;

  constructor(
    public platform: Platform,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public permissionService: PermissionService,
    public staffService: StaffService,
    private companyService: CompanyService,
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _toastCtrl: ToastController,
    public authService: AuthService
  ) {
    if (window.history.state) {
      this.staff = window.history.state.model;
    }

    this.user_id = this.activateRoute.snapshot.paramMap.get('user_id');
    this.type = this.activateRoute.snapshot.paramMap.get('type');

    if (!this.staff) {
      this.loadStaff();
    }
    this.loadPermission();
    this.loadData(this.currentPage);
    this.loadUserPermission();
    this.loadCompanies();


  }

  ngOnInit() {
    window.analytics.page('assign permission List Page');
  }

  loadPermission() {

    if (this.staff && this.staff.permissions) {
      this.staff.permissions.map(res => {
        this.userPermission[res.permission_sub_section_uuid] = true;
      });
    }
  }
  /**
   * load university data
   * @param page
   */
  async loadData(page: number, silent = false) {

    if (!silent) {
      this.loading = true;
    }
    this.permissionService.list(page).subscribe(response => {

      this.loading = false;
      this.deleting = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));
      this.totalCount = parseInt(response.headers.get('X-Pagination-Total-Count'));

      this.permissionSection = response.body;
    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  async loadStaff() {
    this.staffService.view(this.user_id).subscribe(response => {
      this.staff = response;
    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }
  async loadUserPermission() {
    // include company assignments as well if available via new API
    this.permissionService.userPermission(this.type, this.user_id).subscribe(response => {
      if (response) {
        // First, process all sub-section permissions
        response.forEach(res => {
          this.userPermission[res.permission_sub_section_uuid] = true;
          if (res.companies && res.companies.length) {
            this.companyPermissions[res.permission_uuid] = res.companies;
          }
        });
      }
    }, () => {
      this.loading = false;
      this.deleting = false;
    });
  }

  loadCompanies() {
    this.loadingCompanies = true;
    this.companyService.list(1, '', {
      fields: 'company_id,company_name,company_email',
      'per-page': 1000
    }).subscribe(companies => {
      this.companies = companies.body || [];
      // Initialize filtered companies for all sections that need it
      this.permissionSection.forEach(section => {
        if (this.isCompanySpecific(section)) {
          this.filteredCompanies[section.permission_uuid] = [...this.companies];
        }
      });
      this.loadingCompanies = false;
    }, () => this.loadingCompanies = false);
  }

  /**
   * Filter companies based on search term for a specific section
   */
  filterCompanies(sectionId: string) {
    if (!this.companySearchTerms[sectionId]?.trim()) {
      this.filteredCompanies[sectionId] = [...this.companies];
      return;
    }

    const searchTerm = this.companySearchTerms[sectionId].toLowerCase().trim();
    const selectedCompanyIds = this.companyPermissions[sectionId] || [];
    const selectedCompanies = this.companies.filter(c => selectedCompanyIds.includes(c.company_id));

    // Get matching non-selected companies
    const matchingCompanies = this.companies.filter(company =>
      !selectedCompanyIds.includes(company.company_id) && (
        company.company_name?.toLowerCase().includes(searchTerm) ||
        company.company_email?.toLowerCase().includes(searchTerm)
      )
    );

    // Combine selected companies with matching non-selected companies
    this.filteredCompanies[sectionId] = [...selectedCompanies, ...matchingCompanies];
  }

  /**
   * Check if a section has company-specific permissions
   */
  isCompanySpecific(section: any): boolean {
    return section && (section.is_company_specific_permission === 1 || section.is_company_specific_permission === true);
  }

  /**
   * load more on scroll to bottom
   * @param event
   */
  doInfinite(event) {

    this.currentPage++;

    this.loading = true;

    this.permissionService.list(this.currentPage).subscribe(response => {

      this.loading = false;

      this.pageCount = parseInt(response.headers.get('X-Pagination-Page-Count'));
      this.currentPage = parseInt(response.headers.get('X-Pagination-Current-Page'));

      this.permissionSection = this.permissionSection.concat(response.body);

      event.target.complete();

    }, () => {
      this.loading = false;
    });
  }

  /**
   * Loads the create page
   */
  async save() {
    this.permissionService.setUserPermission(this.userPermission, this.type, this.user_id, this.companyPermissions).subscribe(async response => {
      if (response.operation == 'success') {
        this.loadData(1);
      }

      const toast = await this._toastCtrl.create({
        message: this.authService.errorMessage(response.message),
        duration: 3000
      });
      toast.present();
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }
}
