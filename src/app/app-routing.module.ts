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
    //canActivate: [LoginGuard],
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
    path: 'request-checklist',
    loadChildren: () => import('./pages/logged-in/requests/request-checklist/request-checklist-list/request-checklist-list.module').then( m => m.RequestChecklistListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'RequestChecklistListPage'
    }
  },
  {
    path: 'request-checklist-form',
    loadChildren: () => import('./pages/logged-in/requests/request-checklist/request-checklist-form/request-checklist-form.module').then( m => m.RequestChecklistFormPageModule),
    canActivate: [AuthService],
    data: {
      name: 'RequestChecklistFormPage'
    }
  },
  {
    path: 'request-checklist-view',
    loadChildren: () => import('./pages/logged-in/requests/request-checklist/request-checklist-view/request-checklist-view.module').then( m => m.RequestChecklistViewPageModule),
    canActivate: [AuthService],
    data: {
      name: 'RequestChecklistViewPage'
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
    path: 'import',
    loadChildren: () => import('./pages/logged-in/events/import/import.module').then( m => m.ImportPageModule)
  },

  {
    path: 'assigned-candidate',
    loadChildren: () => import('./pages/logged-in/reports/assigned-candidate/assigned-candidate.module').then( m => m.AssignedCandidatePageModule),
    canActivate: [AuthService],
    data: {
      name: 'AssignedCandidatePage'
    }
  },
  {
    path: 'request-list',
    loadChildren: () => import('./pages/logged-in/request/request-list/request-list.module').then( m => m.RequestListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'RequestListPage'
    }
  },
  {
    path: 'request-view',
    loadChildren: () => import('./pages/logged-in/request/request-view/request-view.module').then( m => m.RequestViewPageModule),
    canActivate: [AuthService],
    data: {
      name: 'RequestViewPage'
    }
  },
  {
    path: 'staff-salary-form',
    loadChildren: () => import('./pages/logged-in/staff/staff-salary-form/staff-salary-form.module').then( m => m.StaffSalaryFormPageModule)
  },
  {
    path: 'import-salary-form',
    loadChildren: () => import('./pages/logged-in/staff/import-salary-form/import-salary-form.module').then( m => m.ImportSalaryFormPageModule)
  },
  {
    path: 'story-list',
    loadChildren: () => import('./pages/logged-in/story/story-list/story-list.module').then( m => m.StoryListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'StoryListPage'
    }
  },
  {
    path: 'story-view',
    loadChildren: () => import('./pages/logged-in/story/story-view/story-view.module').then( m => m.StoryViewPageModule),
    canActivate: [AuthService],
    data: {
      name: 'StoryViewPage'
    }
  },
  {
    path: 'log-date-list',
    canActivate: [AuthService],
    loadChildren: () => import('./pages/logged-in/candidate/candidate-work-log/log-date-list/log-date-list.module').then( m => m.LogDateListPageModule),
    data: {
      name: 'LogDateListPage'
    }
  },
  {
    path: 'log-hour-list',
    canActivate: [AuthService],
    loadChildren: () => import('./pages/logged-in/candidate/candidate-work-log/log-hour-list/log-hour-list.module').then(m => m.LogHourListPageModule),
    data: {
      name: 'LogHourListPage'
    },
  },
  {
    path: 'permission-section-list',
    canActivate: [AuthService],
    loadChildren: () => import('./pages/logged-in/permission/permission-section/permission-section-list/permission-section-list.module').then(m => m.PermissionSectionListPageModule),
    data: {
      name: 'PermissionSectionListPage'
    }
  },
  {
    path: 'assign-permission',
    canActivate: [AuthService],
    loadChildren: () => import('./pages/logged-in/permission/permission-section/assign-permission/assign-permission.module').then(m => m.AssignPermissionPageModule),
    data: {
      name: 'AssignPermissionPage'
    }
  },
  {
    path: 'daily-standup-question-list',
    canActivate: [AuthService],
    loadChildren: () => import('./pages/logged-in/daily-standup/daily-standup-question/daily-standup-question-list/daily-standup-question-list.module').then( m => m.DailyStandupQuestionListPageModule),
    data: {
      name: 'DailyStandupQuestionListPage',
      navDisable: false,
    }
  },
  {
    path: 'daily-standup-answer-list',
    canActivate: [AuthService],
    loadChildren: () => import('./pages/logged-in/daily-standup/daily-standup-answer/daily-standup-answer-list/daily-standup-answer-list.module').then( m => m.DailyStandupAnswerListModule),
    data: {
      name: 'DailyStandupAnswerListPage',
      navDisable: false,
    }
  },
  {
    path: 'daily-standup-question-form',
    canActivate: [AuthService],
    loadChildren: () => import('./pages/logged-in/daily-standup/daily-standup-question/daily-standup-question-form/daily-standup-question-form.module').then( m => m.DailyStandupQuestionFormPageModule),
    data: {
      name: 'DailyStandupQuestionFormPage',
      navDisable: false,
    }
  },
  {
    path: 'company-contact-list',
    canActivate: [AuthService],
    loadChildren: () => import('./pages/logged-in/company/company-contact-list/company-contact-list.module').then( m => m.CompanyContactListModule),
    data: {
      name: 'CompanyContactListPage',
      navDisable: false,
    }
  },
  {
    path: 'fulltimer-list',
    loadChildren: () => import('./pages/logged-in/fulltimer/fulltimer-list/fulltimer-list.module').then( m => m.FulltimerListModule),
    canActivate: [AuthService],
    data: {
      name: 'FulltimerListPage',
      navDisable: false,
    }
  },
  {
    path: 'fulltimer-view',
    loadChildren: () => import('./pages/logged-in/fulltimer/fulltimer-view/fulltimer-view.module').then( m => m.FulltimerViewModule),
    canActivate: [AuthService],
    data: {
      name: 'FulltimerViewPage',
      navDisable: false,
    }
  },
  {
    path: 'staff-work-session-list',
    loadChildren: () => import('./pages/logged-in/staff/staff-work-session/staff-work-session-list/staff-work-session-list.module').then( m => m.StaffWorkSessionListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'StaffWorkSessionListPage',
      navDisable: false,
    }
  },
  {
    path: 'staff-salary-list',
    loadChildren: () => import('./pages/logged-in/salary/staff-salary-list/staff-salary-list.module').then( m => m.StaffSalaryListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'StaffSalaryListPage',
      navDisable: false,
    }
  },
  {
    path: 'staff-salary-register',
    loadChildren: () => import('./pages/logged-in/salary/staff-salary-register/staff-salary-register.module').then( m => m.StaffSalaryRegisterPageModule),
    canActivate: [AuthService],
    data: {
      name: 'StaffSalaryRegisterPage',
      navDisable: false,
    }
  },
  {
    path: 'can-eval-ques-list',
    loadChildren: () => import('./pages/logged-in/candidate/evaluation/can-eval-ques-list/can-eval-ques-list.module').then( m => m.CanEvalQuesListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'CanEvalQuesListPage',
      navDisable: false,
    }
  },
  {
    path: 'can-eval-list',
    loadChildren: () => import('./pages/logged-in/candidate/evaluation/can-eval-list/can-eval-list.module').then( m => m.CanEvalListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'CanEvalListPage',
      navDisable: false,
    }
  },
  {
    path: 'can-eval-ques-dept-form',
    loadChildren: () => import('./pages/logged-in/candidate/evaluation/can-eval-ques-dept-form/can-eval-ques-dept-form.module').then( m => m.CanEvalQuesDeptFormPageModule),
    canActivate: [AuthService],
    data: {
      name: 'CanEvalQuesDeptFormPage',
      navDisable: false,
    }
  },
  {
    path: 'staff-expense-list',
    loadChildren: () => import('./pages/logged-in/staff/expenses/staff-expense-list/staff-expense-list.module').then( m => m.StaffExpenseListPageModule),
    canActivate: [AuthService],
    data: {
      name: 'StaffExpenseListPage',
      navDisable: false,
    }
  },
  {
    path: 'staff-expense-view',
    loadChildren: () => import('./pages/logged-in/staff/expenses/staff-expense-view/staff-expense-view.module').then( m => m.StaffExpenseViewPageModule),
    canActivate: [AuthService],
    data: {
      name: 'StaffExpenseViewPage',
      navDisable: false,
    }
  },

  {
    path: '**',
    redirectTo: 'not-found'
  },
  {
    path: 'evaluation-report-view',
    loadChildren: () => import('./pages/logged-in/candidate/evaluation/evaluation-report-view/evaluation-report-view.module').then( m => m.EvaluationReportViewPageModule)
  },
  {
    path: 'staff-leave-list',
    loadChildren: () => import('./pages/logged-in/staff/staff-leaves/staff-leave-list/staff-leave-list.module').then( m => m.StaffLeaveListPageModule)
  },
  {
    path: 'staff-leave-view',
    loadChildren: () => import('./pages/logged-in/staff/staff-leaves/staff-leave-view/staff-leave-view.module').then( m => m.StaffLeaveViewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false, preloadingStrategy: SelectiveLoadingStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
