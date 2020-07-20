import {NgModule, APP_INITIALIZER, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { File } from '@ionic-native/file/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';

import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthService } from './providers/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { BankFormPageModule } from './pages/logged-in/bank/bank-form/bank-form.module';
import { CompanyFormPageModule } from './pages/logged-in/company/company-form/company-form.module';
import { StaffFormPageModule } from './pages/logged-in/staff/staff-form/staff-form.module';
import { UniversityFormPageModule } from './pages/logged-in/university/university-form/university-form.module';
import { UpdateAlertModule } from './components/update-alert/update-alert.module';
import {SentryErrorhandlerService} from './providers/sentry.errorhandler.service';

export function startupServiceFactory(authService) {
  return () => authService.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__payroll_admin'
    }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.serviceWorker }),
    BankFormPageModule,
    CompanyFormPageModule,
    StaffFormPageModule,
    UniversityFormPageModule,
    UpdateAlertModule,
  ],
  providers: [
    {
      // Provider for APP_INITIALIZER
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [AuthService],
      multi: true
    },
    SwUpdate,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: SentryErrorhandlerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
