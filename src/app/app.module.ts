import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
// Generic Services
import { AuthService } from '../providers/auth.service';
import { ConfigService } from '../providers/config.service';
// Logged-in Services
import { AuthHttpService } from '../providers/logged-in/authhttp.service';
import { CompanyService } from '../providers/logged-in/company.service';

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
    CompanyFormPage
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
    CompanyFormPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  providers: [
      {provide: ErrorHandler, useClass: IonicErrorHandler},
      Storage, // Ionic Storage
      AuthService, // Handles all Authorization
      ConfigService, // Handles Environment-specific Variables
      AuthHttpService,
      CompanyService
  ],
  bootstrap: [IonicApp]
})
export class AppModule {}
