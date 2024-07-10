import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImageUploadComponent } from "./image-upload.component";


@NgModule({
    declarations: [
        ImageUploadComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
    ],
    exports: [
        ImageUploadComponent,
    ]
})
export class ImageUploadModule { }