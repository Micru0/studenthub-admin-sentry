import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { NoItemsComponent } from "./no-items.component";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        NoItemsComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
    ],
    exports: [
        NoItemsComponent,
    ]
})
export class NoItemsModule { }