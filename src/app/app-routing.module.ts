import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//services
import { AuthService } from './providers/auth.service';
import {LoginGuard} from "./providers/guards/login-guard.service";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'no-internet',
    loadChildren: () => import('./pages/start-pages/no-internet/no-internet.module').then(m => m.NoInternetPageModule),
    data: {
      name: 'NoInternetPage',
    }
  },
  {
    path: 'server-error',
    loadChildren: () => import('./pages/errors/server-error/server-error.module').then(m => m.ServerErrorPageModule),
    data: {
      name: 'ServerErrorPage',
    }
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/errors/not-found/not-found.module').then(m => m.NotFoundPageModule),
    data: {
      name: 'NotFoundPage',
    }
  },
  {
    path: 'bank-list',
    loadChildren: () => import('./pages/logged-in/bank/bank-list/bank-list.module').then( m => m.BankListPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'bank-form',
    loadChildren: () => import('./pages/logged-in/bank/bank-form/bank-form.module').then( m => m.BankFormPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'bank-view',
    loadChildren: () => import('./pages/logged-in/bank/bank-view/bank-view.module').then( m => m.BankViewPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'candidate-view',
    loadChildren: () => import('./pages/logged-in/candidate/candidate-view/candidate-view.module').then( m => m.CandidateViewPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'candidate-review-list',
    loadChildren: () => import('./pages/logged-in/candidate/candidate-review-list/candidate-review-list.module').then( m => m.CandidateReviewListPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'company-form',
    loadChildren: () => import('./pages/logged-in/company/company-form/company-form.module').then( m => m.CompanyFormPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'company-list',
    loadChildren: () => import('./pages/logged-in/company/company-list/company-list.module').then( m => m.CompanyListPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'company-view',
    loadChildren: () => import('./pages/logged-in/company/company-view/company-view.module').then( m => m.CompanyViewPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'country-list',
    loadChildren: () => import('./pages/logged-in/country/country-list/country-list.module').then( m => m.CountryListPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'country-view',
    loadChildren: () => import('./pages/logged-in/country/country-view/country-view.module').then( m => m.CountryViewPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/logged-in/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'staff-list',
    loadChildren: () => import('./pages/logged-in/staff/staff-list/staff-list.module').then( m => m.StaffListPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'staff-view',
    loadChildren: () => import('./pages/logged-in/staff/staff-view/staff-view.module').then( m => m.StaffViewPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'staff-form',
    loadChildren: () => import('./pages/logged-in/staff/staff-form/staff-form.module').then( m => m.StaffFormPageModule),
    canActivate: [AuthService],
  },

  {
    path: 'admin-list',
    loadChildren: () => import('./pages/logged-in/admin/admin-list/admin-list.module').then( m => m.AdminListPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'admin-view',
    loadChildren: () => import('./pages/logged-in/admin/admin-view/admin-view.module').then( m => m.AdminViewPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'admin-form',
    loadChildren: () => import('./pages/logged-in/admin/admin-form/admin-form.module').then( m => m.AdminFormPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'store-view',
    loadChildren: () => import('./pages/logged-in/store/store-view/store-view.module').then( m => m.StoreViewPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'candidate-payment-search',
    loadChildren: () => import('./pages/logged-in/transfer/candidate-payment-search/candidate-payment-search.module').then( m => m.CandidatePaymentSearchPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'candidate-transfer-detail',
    loadChildren: () => import('./pages/logged-in/transfer/candidate-transfer-detail/candidate-transfer-detail.module').then( m => m.CandidateTransferDetailPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'candidate-transfer-list',
    loadChildren: () => import('./pages/logged-in/transfer/candidate-transfer-list/candidate-transfer-list.module').then( m => m.CandidateTransferListPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'payable-candidates',
    loadChildren: () => import('./pages/logged-in/transfer/payable-candidates/payable-candidates.module').then( m => m.PayableCandidatesPageModule),
    canActivate: [AuthService],
  },

  {
    path: 'import-transfer-form',
    loadChildren: () => import('./pages/logged-in/transfer/import-transfer-form/import-transfer-form.module').then(m => m.ImportTransferFormPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'transfer-list',
    loadChildren: () => import('./pages/logged-in/transfer/transfer-list/transfer-list.module').then( m => m.TransferListPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'transfer-paid',
    loadChildren: () => import('./pages/logged-in/transfer/transfer-paid/transfer-paid.module').then( m => m.TransferPaidPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'transfer-view',
    loadChildren: () => import('./pages/logged-in/transfer/transfer-view/transfer-view.module').then( m => m.TransferViewPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'university-list',
    loadChildren: () => import('./pages/logged-in/university/university-list/university-list.module').then( m => m.UniversityListPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'university-view',
    loadChildren: () => import('./pages/logged-in/university/university-view/university-view.module').then( m => m.UniversityViewPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'university-form',
    loadChildren: () => import('./pages/logged-in/university/university-form/university-form.module').then( m => m.UniversityFormPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/start-pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'transfer-file-list',
    loadChildren: () => import('./pages/logged-in/transfer/transfer-file-list/transfer-file-list.module').then( m => m.TransferFileListPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'transfer-file-detail',
    loadChildren: () => import('./pages/logged-in/transfer/transfer-file-detail/transfer-file-detail.module').then( m => m.TransferFileDetailPageModule),
    canActivate: [AuthService],
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },   {
    path: 'brand-form',
    loadChildren: () => import('./pages/logged-in/company/brand-form/brand-form.module').then( m => m.BrandFormPageModule)
  },
  {
    path: 'company-contact-form',
    loadChildren: () => import('./pages/logged-in/company/company-contact-form/company-contact-form.module').then( m => m.CompanyContactFormPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false, preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
