import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectiveLoadingStrategy } from './util/SelectiveLoadingStrategy';
// services
import { AuthService } from './providers/auth.service';
import { LoginGuard } from './providers/guards/login-guard.service';


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
    loadChildren: () => import('./pages/logged-in/bank/bank-list/bank-list.module').then(m => m.BankListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'BankListPage',
    }
  },
  {
    path: 'bank-form',
    loadChildren: () => import('./pages/logged-in/bank/bank-form/bank-form.module').then(m => m.BankFormPageModule),
    canActivate: [AuthService],
    data: {
      name: 'BankFormPage',
    }
  },
  {
    path: 'bank-view',
    loadChildren: () => import('./pages/logged-in/bank/bank-view/bank-view.module').then(m => m.BankViewPageModule),
    canActivate: [AuthService],
    data: {
      name: 'BankViewPage',
    }
  },
  {
    path: 'candidate-list',
    loadChildren: () => import('./pages/logged-in/candidate/candidate-list/candidate-list.module').then(m => m.CandidateListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'CandidateListPage',
    }
  },
  {
    path: 'candidate-view',
    loadChildren: () => import('./pages/logged-in/candidate/candidate-view/candidate-view.module').then(m => m.CandidateViewPageModule),
    canActivate: [AuthService],
    data: {
      name: 'CandidateViewPage',
    }
  },
  {
    path: 'candidate-review-list',
    loadChildren: () => import('./pages/logged-in/candidate/candidate-review-list/candidate-review-list.module').then(m => m.CandidateReviewListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'CandidateReviewPage',
    }
  },
  {
    path: 'company-form',
    loadChildren: () => import('./pages/logged-in/company/company-form/company-form.module').then(m => m.CompanyFormPageModule),
    canActivate: [AuthService],
  },
  {
    path: 'company-list',
    loadChildren: () => import('./pages/logged-in/company/company-list/company-list.module').then(m => m.CompanyListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'CompanyListPage',
    }
  },
  {
    path: 'company-view',
    loadChildren: () => import('./pages/logged-in/company/company-view/company-view.module').then(m => m.CompanyViewPageModule),
    canActivate: [AuthService],
    data: {
      name: 'CompanyViewPage',
      navDisable: true,
    }
  },
  {
    path: 'country-list',
    loadChildren: () => import('./pages/logged-in/country/country-list/country-list.module').then(m => m.CountryListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'CompanyListPage'
    }
  },
  {
    path: 'country-view',
    loadChildren: () => import('./pages/logged-in/country/country-view/country-view.module').then(m => m.CountryViewPageModule),
    canActivate: [AuthService],
    data: {
      name: 'CountryViewPage'
    }
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/logged-in/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthService],
    data: {
      name: 'DashboardPage'
    }
  },
  {
    path: 'staff-list',
    loadChildren: () => import('./pages/logged-in/staff/staff-list/staff-list.module').then(m => m.StaffListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'StaffListPage'
    }
  },
  {
    path: 'staff-view',
    loadChildren: () => import('./pages/logged-in/staff/staff-view/staff-view.module').then(m => m.StaffViewPageModule),
    canActivate: [AuthService],
    data: {
      name: 'StaffViewPage'
    }
  },
  {
    path: 'staff-form',
    loadChildren: () => import('./pages/logged-in/staff/staff-form/staff-form.module').then(m => m.StaffFormPageModule),
    canActivate: [AuthService],
    data: {
      name: 'StaffFormPage'
    }
  },
  {
    path: 'admin-list',
    loadChildren: () => import('./pages/logged-in/admin/admin-list/admin-list.module').then(m => m.AdminListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'AdminListPage'
    }
  },
  {
    path: 'admin-view',
    loadChildren: () => import('./pages/logged-in/admin/admin-view/admin-view.module').then(m => m.AdminViewPageModule),
    canActivate: [AuthService],
    data: {
      name: 'AdminViewPage'
    }
  },
  {
    path: 'admin-form',
    loadChildren: () => import('./pages/logged-in/admin/admin-form/admin-form.module').then(m => m.AdminFormPageModule),
    canActivate: [AuthService],
    data: {
      name: 'AdminFormPage'
    }
  },
  {
    path: 'store-view',
    loadChildren: () => import('./pages/logged-in/store/store-view/store-view.module').then(m => m.StoreViewPageModule),
    canActivate: [AuthService],
    data: {
      name: 'StoreViewPage'
    }
  },
  {
    path: 'candidate-payment-search',
    loadChildren: () => import('./pages/logged-in/transfer/candidate-payment-search/candidate-payment-search.module').then(m => m.CandidatePaymentSearchPageModule),
    canActivate: [AuthService],
    data: {
      name: 'CandidatePaymentSearchPage'
    }
  },
  {
    path: 'candidate-transfer-detail',
    loadChildren: () => import('./pages/logged-in/transfer/candidate-transfer-detail/candidate-transfer-detail.module').then(m => m.CandidateTransferDetailPageModule),
    canActivate: [AuthService],
    data: {
      name: 'CandidateTransferDetailPage'
    }
  },
  {
    path: 'candidate-transfer-list',
    loadChildren: () => import('./pages/logged-in/transfer/candidate-transfer-list/candidate-transfer-list.module').then(m => m.CandidateTransferListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'CandidateTransferListPage'
    }
  },
  {
    path: 'payable-candidates',
    loadChildren: () => import('./pages/logged-in/transfer/payable-candidates/payable-candidates.module').then(m => m.PayableCandidatesPageModule),
    canActivate: [AuthService],
    data: {
      name: 'PayableCandidatesPage'
    }
  },
  {
    path: 'import-transfer-form',
    loadChildren: () => import('./pages/logged-in/transfer/import-transfer-form/import-transfer-form.module').then(m => m.ImportTransferFormPageModule),
    canActivate: [AuthService],
    data: {
      name: 'ImportTransferFormPage'
    }
  },
  {
    path: 'transfer-list',
    loadChildren: () => import('./pages/logged-in/transfer/transfer-list/transfer-list.module').then(m => m.TransferListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'TransferListPage'
    }
  },
  {
    path: 'suspicious-transfer-list',
    loadChildren: () => import('./pages/logged-in/transfer/suspicious-transfer-list/suspicious-transfer-list.module').then(m => m.SuspiciousTransferListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'SuspiciousTransferListPage'
    }
  },
  {
    path: 'suspicious-transfer-view',
    loadChildren: () => import('./pages/logged-in/transfer/suspicious-transfer-view/suspicious-transfer-view.module').then(m => m.SuspiciousTransferViewPageModule),
    canActivate: [AuthService],
    data: {
      name: 'SuspiciousTransferViewPage'
    }
  },
  {
    path: 'transfer-paid',
    loadChildren: () => import('./pages/logged-in/transfer/transfer-paid/transfer-paid.module').then(m => m.TransferPaidPageModule),
    canActivate: [AuthService],
    data: {
      name: 'TransferPaidPage'
    }
  },
  {
    path: 'transfer-view',
    loadChildren: () => import('./pages/logged-in/transfer/transfer-view/transfer-view.module').then(m => m.TransferViewPageModule),
    canActivate: [AuthService],
    data: {
      name: 'TransferViewPage'
    }
  },
  {
    path: 'university-list',
    loadChildren: () => import('./pages/logged-in/university/university-list/university-list.module').then(m => m.UniversityListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'UniversityListPage'
    }
  },
  {
    path: 'university-view',
    loadChildren: () => import('./pages/logged-in/university/university-view/university-view.module').then(m => m.UniversityViewPageModule),
    canActivate: [AuthService],
    data: {
      name: 'UniversityViewPage'
    }
  },
  {
    path: 'university-form',
    loadChildren: () => import('./pages/logged-in/university/university-form/university-form.module').then(m => m.UniversityFormPageModule),
    canActivate: [AuthService],
    data: {
      name: 'UniversityFormPage'
    }
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/start-pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [LoginGuard],
    data: {
      name: 'LoginPage'
    }
  },
  {
    path: 'transfer-file-list',
    loadChildren: () => import('./pages/logged-in/transfer/transfer-file-list/transfer-file-list.module').then(m => m.TransferFileListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'TransferFileListPage'
    }
  },
  {
    path: 'transfer-file-detail',
    loadChildren: () => import('./pages/logged-in/transfer/transfer-file-detail/transfer-file-detail.module').then(m => m.TransferFileDetailPageModule),
    canActivate: [AuthService],
    data: {
      name: 'TransferFileDetailPage'
    }
  },
  {
    path: 'brand-form',
    loadChildren: () => import('./pages/logged-in/company/brand-form/brand-form.module').then(m => m.BrandFormPageModule),
    data: {
      name: 'BrandFormPage'
    }
  },
  {
    path: 'company-contact-form',
    loadChildren: () => import('./pages/logged-in/company/company-contact-form/company-contact-form.module').then(m => m.CompanyContactFormPageModule),
    data: {
      name: 'CompanyContactFormPage'
    }
  },
  {
    path: 'inspector-list',
    loadChildren: () => import('./pages/logged-in/inspector/inspector-list/inspector-list.module').then(m => m.InspectorListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'InspectorListPage'
    }
  },
  {
    path: 'inspector-view',
    loadChildren: () => import('./pages/logged-in/inspector/inspector-view/inspector-view.module').then(m => m.InspectorViewPageModule),
    canActivate: [AuthService],
    data: {
      name: 'InspectorViewPage'
    }
  },
  {
    path: 'inspector-form',
    loadChildren: () => import('./pages/logged-in/inspector/inspector-form/inspector-form.module').then(m => m.InspectorFormPageModule),
    canActivate: [AuthService],
    data: {
      name: 'InspectorFormPage'
    }
  },
  {
    path: 'brand-view',
    loadChildren: () => import('./pages/logged-in/company/brand-view/brand-view.module').then(m => m.BrandViewPageModule),
    canActivate: [AuthService],
    data: {
      name: 'BrandViewPage'
    }
  },
  {
    path: 'company-contact-view',
    loadChildren: () => import('./pages/logged-in/company/company-contact-view/company-contact-view.module').then( m => m.CompanyContactViewPageModule),
    canActivate: [AuthService],
    data: {
      name: 'CompanyContactViewPage'
    }
  },
  {
    path: 'stats',
    loadChildren: () => import('./pages/logged-in/stats/stats.module').then( m => m.StatsPageModule),
    canActivate: [AuthService],
    data: {
      name: 'StatsPage'
    }
  },
  {
    path: 'expense-view',
    loadChildren: () => import('./pages/logged-in/expense/expense-view/expense-view.module').then( m => m.ExpenseViewPageModule)
  },
  {
    path: 'expense-form',
    loadChildren: () => import('./pages/logged-in/expense/expense-form/expense-form.module').then( m => m.ExpenseFormPageModule)
  },
  {
    path: 'expense-list',
    loadChildren: () => import('./pages/logged-in/expense/expense-list/expense-list.module').then( m => m.ExpenseListPageModule)
  },
  {
    path: 'app-error',
    loadChildren: () => import('./pages/errors/app-error/app-error.module').then( m => m.AppErrorPageModule)
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false, preloadingStrategy: SelectiveLoadingStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
