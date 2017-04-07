import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicStorageModule } from '@ionic/storage';

// Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// App Imports
import { MyApp } from './app.component';

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

// Bank CRUD
import { BankListPage } from '../pages/logged-in/bank/bank-list/bank-list';
import { BankViewPage } from '../pages/logged-in/bank/bank-view/bank-view';
import { BankFormPage } from '../pages/logged-in/bank/bank-form/bank-form';

// Generic Services
import { AuthService } from '../providers/auth.service';
import { ConfigService } from '../providers/config.service';
// Logged-in Services
import { AuthHttpService } from '../providers/logged-in/authhttp.service';
import { CompanyService } from '../providers/logged-in/company.service';
import { StaffService } from '../providers/logged-in/staff.service';
import { BankService } from '../providers/logged-in/bank.service';


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
    // Company Crud
    CompanyListPage,
    CompanyViewPage,
    CompanyFormPage,
    // Staff Crud
    StaffListPage,
    StaffViewPage,
    StaffFormPage,
    BankListPage,
    BankViewPage,
    BankFormPage
  ],
  entryComponents: [
    MyApp,
    // Logged Out
    LoginPage,
    // Logged In
    NavigationPage,
    DefaultPage,
    // Company Crud
    CompanyListPage,
    CompanyViewPage,
    CompanyFormPage,
    // Staff Crud
    StaffListPage,
    StaffViewPage,
    StaffFormPage,
    BankListPage,
    BankViewPage,
    BankFormPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot()
  ],
  providers: [
      // Ionic Native 
      StatusBar,
      SplashScreen,
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      // Custom
      AuthService, // Handles all Authorization
      ConfigService, // Handles Environment-specific Variables
      AuthHttpService,
      CompanyService,
      StaffService,
      BankService
  ],
  bootstrap: [IonicApp]
})
export class AppModule {}
