import { NgModule } from '@angular/core';
import { FileSizePipe } from './filesize.pipe';
import { GroupByPipe } from './groupby-pipe';
import { SortPipe } from './timestamp-pipe';


//import custom pipes here
@NgModule({
    declarations: [
        GroupByPipe,
        SortPipe,
        FileSizePipe
    ],
    imports: [],
    exports: [
        GroupByPipe,
        SortPipe,
        FileSizePipe
    ]
})
export class PipesModule {}