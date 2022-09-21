import { NgModule } from '@angular/core';
import { FileSizePipe } from './filesize.pipe';
import { GroupByPipe } from './groupby-pipe';
import { TimeAgoPipe } from './timeago.pipe';
import { SortPipe } from './timestamp-pipe';
import { DurationPipe } from './duration.pipe';
import {TimeSpentPipe} from './timespent.pipe';


// import custom pipes here
@NgModule({
    declarations: [
        GroupByPipe,
        SortPipe,
        FileSizePipe,
        TimeAgoPipe,
        DurationPipe,
        TimeSpentPipe
    ],
    imports: [],
    exports: [
        GroupByPipe,
        SortPipe,
        FileSizePipe,
        TimeAgoPipe,
        DurationPipe,
        TimeSpentPipe
    ]
})
export class PipesModule {}
