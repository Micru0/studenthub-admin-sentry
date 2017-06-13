import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule } from '@ionic/storage';

// Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

// App Imports
import { MyApp } from './app.component';

/**
 * Modules
 */
import { EnvironmentsModule } from './environments/environments.module';

// Start Pages [Logged Out]
import { LoginPage } from '../pages/start-pages/login/login';
// Pages when logged in
import { NavigationPage } from '../pages/logged-in/navigation/navigation';
import { DefaultPage } from '../pages/logged-in/default/default';
// Company CRUD
import { CompanyListPage } from '../pages/logged-in/company/company-list/company-list';
import { CompanyViewPage } from '../pages/logged-in/company/company-view/company-view';
import { CompanyFormPage } from '../pages/logged-in/company/company-form/company-form';
// Staff CRUD
import { StaffListPage } from '../pages/logged-in/staff/staff-list/staff-list';
import { StaffViewPage } from '../pages/logged-in/staff/staff-view/staff-view';
import { StaffFormPage } from '../pages/logged-in/staff/staff-form/staff-form';

// Transfer
import { TransferListPage } from '../pages/logged-in/transfer/transfer-list/transfer-list';
import { TransferViewPage } from '../pages/logged-in/transfer/transfer-view/transfer-view';
import { TransferPaidPage } from '../pages/logged-in/transfer/transfer-paid/transfer-paid';
import { PayableCandidatesPage } from '../pages/logged-in/transfer/payable-candidates/payable-candidates';

// Candidate 
import { CandidateViewPage } from '../pages/logged-in/candidate/candidate-view/candidate-view';
import { CandidateReviewListPage } from '../pages/logged-in/candidate/candidate-review-list/candidate-review-list';
    
// Bank CRUD
import { BankListPage } from '../pages/logged-in/bank/bank-list/bank-list';
import { BankViewPage } from '../pages/logged-in/bank/bank-view/bank-view';
import { BankFormPage } from '../pages/logged-in/bank/bank-form/bank-form';

// Country CRUD
import { CountryListPage } from '../pages/logged-in/country/country-list/country-list';
import { CountryViewPage } from '../pages/logged-in/country/country-view/country-view';

// University CRUD
import { UniversityListPage } from '../pages/logged-in/university/university-list/university-list';
import { UniversityViewPage } from '../pages/logged-in/university/university-view/university-view';
import { UniversityFormPage } from '../pages/logged-in/university/university-form/university-form';

//Stpre CRUD 
import { StoreViewPage } from '../pages/logged-in/store/store-view/store-view';
import { StoreFormPage } from '../pages/logged-in/store/store-form/store-form';

// Generic Services
import { AuthService } from '../providers/auth.service';
import { ConfigService } from '../providers/config.service';

// Logged-in Services
import { AuthHttpService } from '../providers/logged-in/authhttp.service';
import { CompanyService } from '../providers/logged-in/company.service';
import { StaffService } from '../providers/logged-in/staff.service';
import { BankService } from '../providers/logged-in/bank.service';
import { UniversityService } from '../providers/logged-in/university.service';
import { TransferService } from '../providers/logged-in/transfer.service';
import { CandidateService } from '../providers/logged-in/candidate.service';
import { StoreService } from '../providers/logged-in/store.service';
import { CountryService } from '../providers/logged-in/country.service';
import { StatisticService } from '../providers/logged-in/statistic.service';

import { GroupByPipe } from '../pages/logged-in/transfer/groupby-pipe';
import { SortPipe } from '../pages/logged-in/transfer/timestamp-pipe';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'dfb10dee'
  }
};

@NgModule({
  declarations: [
    MyApp,
    // Logged Out
    LoginPage,
    // Logged In
    NavigationPage,
    DefaultPage,
    //Store Crud
    StoreFormPage,
    StoreViewPage,
    //Transfer Crud
    TransferListPage,
    TransferViewPage,
    TransferPaidPage,
    PayableCandidatesPage,
    //candidate Crud
    CandidateReviewListPage,
    CandidateViewPage,
    // Company Crud
    CompanyListPage,
    CompanyViewPage,
    CompanyFormPage,
    // Staff Crud
    StaffListPage,
    StaffViewPage,
    StaffFormPage,
    // Bank
    BankListPage,
    BankViewPage,
    BankFormPage,    
    // University
    UniversityListPage,
    UniversityViewPage,
    UniversityFormPage,   
    //country Crud
    CountryListPage,
    CountryViewPage, 
    // Pipes
    GroupByPipe,
    SortPipe
  ],
  entryComponents: [
    MyApp,
    // Logged Out
    LoginPage,
    // Logged In
    NavigationPage,
    DefaultPage,
    //Store Crud
    StoreFormPage,
    StoreViewPage,
    //Transfer Crud
    TransferListPage,
    TransferViewPage,
    TransferPaidPage,
    PayableCandidatesPage,
    //candidate Crud
    CandidateReviewListPage,
    CandidateViewPage,    
    // Company Crud
    CompanyListPage,
    CompanyViewPage,
    CompanyFormPage,
    // Staff Crud
    StaffListPage,
    StaffViewPage,
    StaffFormPage,
    // Bank
    BankListPage,
    BankViewPage,
    BankFormPage,
    // University
    UniversityListPage,
    UniversityViewPage,
    UniversityFormPage,   
    //country Crud
    CountryListPage,
    CountryViewPage,  
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),
    // Custom Modules
    EnvironmentsModule
  ],
  providers: [
      // Ionic Native 
      StatusBar,
      SplashScreen,
      Transfer, 
      TransferObject,
      File,
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      // Custom
      AuthService, // Handles all Authorization
      ConfigService, // Handles Environment-specific Variables
      AuthHttpService,
      CompanyService,
      StaffService,
      BankService,
      TransferService,
      CandidateService,
      StoreService,
      UniversityService,
      CountryService,
      StatisticService
  ],
  bootstrap: [IonicApp]
})
export class AppModule {}
