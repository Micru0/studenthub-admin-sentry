import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
//import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { File } from '@ionic-native/file/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';

import { GroupByPipe } from './pipes/groupby-pipe';
import { SortPipe } from './pipes/timestamp-pipe';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthService } from './providers/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { BankFormPageModule } from './pages/logged-in/bank/bank-form/bank-form.module';
import { CompanyFormPageModule } from './pages/logged-in/company/company-form/company-form.module';
import { StaffFormPageModule } from './pages/logged-in/staff/staff-form/staff-form.module';
import { UniversityFormPageModule } from './pages/logged-in/university/university-form/university-form.module';

/*const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'dfb10dee'
  }
};*/

export function startupServiceFactory(authService) {
  return () => authService.load();
}

@NgModule({
  declarations: [
    AppComponent,
     // Pipes
     GroupByPipe,
     SortPipe
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    //CloudModule.forRoot(cloudSettings),
    BankFormPageModule,
    CompanyFormPageModule,
    StaffFormPageModule,
    UniversityFormPageModule
  ],
  providers: [
    {
      // Provider for APP_INITIALIZER
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [AuthService],
      multi: true
    },,
    StatusBar,
    SplashScreen,
    SwUpdate,
    //Transfer, 
    //TransferObject,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
