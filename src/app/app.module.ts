import { NgModule, APP_INITIALIZER, Injector, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { File } from '@ionic-native/file/ngx';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { IonicStorageModule } from '@ionic/storage';
import { CalendarModule } from 'ion2-calendar';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthService } from './providers/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { BankFormPageModule } from './pages/logged-in/bank/bank-form/bank-form.module';
import { CompanyFormPageModule } from './pages/logged-in/company/company-form/company-form.module';
import { StaffFormPageModule } from './pages/logged-in/staff/staff-form/staff-form.module';
import { AdminFormPageModule } from './pages/logged-in/admin/admin-form/admin-form.module';
import { UniversityFormPageModule } from './pages/logged-in/university/university-form/university-form.module';
import { UpdateAlertModule } from './components/update-alert/update-alert.module';
import { SentryErrorhandlerService } from './providers/sentry.errorhandler.service';
import { UploadFilePageModule } from './pages/logged-in/company/upload-file/upload-file.module';
import { BrandFormPageModule } from './pages/logged-in/company/brand-form/brand-form.module';
import { CompanyContactFormPageModule } from './pages/logged-in/company/company-contact-form/company-contact-form.module';
import { NoItemsModule } from "./components/no-items/no-items.module";
import {SelectiveLoadingStrategy} from "./util/SelectiveLoadingStrategy";
import {CountryFormPageModule} from "./pages/logged-in/country/country-form/country-form.module";
import {InspectorFormPageModule} from "./pages/logged-in/inspector/inspector-form/inspector-form.module";
import { ModalPopPageModule } from './pages/logged-in/modal-pop/modal-pop.module';
import { RequestChecklistFormPageModule } from './pages/logged-in/requests/request-checklist/request-checklist-form/request-checklist-form.module';

export function startupServiceFactory(authService) {
  return () => authService.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    CKEditorModule,
    HttpClientModule,
    BrowserModule,
    CalendarModule,
    IonicModule.forRoot(),
    // IonicStorageModule.forRoot({
    //   name: '__payroll_admin'
    // }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.serviceWorker }),
    BankFormPageModule,
    CompanyFormPageModule,
    StaffFormPageModule,
    AdminFormPageModule,
    UniversityFormPageModule,
    UpdateAlertModule,
    UploadFilePageModule,
    BrandFormPageModule,
    CompanyContactFormPageModule,
    NoItemsModule,
    CountryFormPageModule,
    InspectorFormPageModule,
    ModalPopPageModule,
    RequestChecklistFormPageModule
  ],
  providers: [
    {
      // Provider for APP_INITIALIZER
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [AuthService],
      multi: true
    },
    File,
    FileChooser,
    FilePath,
    IOSFilePicker,
    SwUpdate,
    SelectiveLoadingStrategy,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: SentryErrorhandlerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  static injector: Injector;

  constructor(public injector: Injector) {
    AppModule.injector = injector;
  }
}
