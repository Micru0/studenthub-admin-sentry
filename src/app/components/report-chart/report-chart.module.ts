import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReportChartComponent } from './report-chart.component';
  
@NgModule({
    declarations: [ReportChartComponent],
    imports: [ 
        IonicModule
    ],
    exports: [ReportChartComponent]
})
export class ReportChartModule { }