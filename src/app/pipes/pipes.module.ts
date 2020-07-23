import { NgModule } from '@angular/core';
import { GroupByPipe } from './groupby-pipe';
import { SortPipe } from './timestamp-pipe';


//import custom pipes here
@NgModule({
    declarations: [
        GroupByPipe,
        SortPipe
    ],
    imports: [],
    exports: [
        GroupByPipe,
        SortPipe
    ]
})
export class PipesModule {}