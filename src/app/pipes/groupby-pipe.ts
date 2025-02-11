import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform(value, key) : any {
    var groups = {};

    value.forEach(function(o) {
      var group = o[key];
    
      groups[group] = groups[group] ?
         groups[group] : { name: group, resources: [] };

      groups[group].resources.push(o);  
    });

    return Object.keys(groups).map(function (key) {return groups[key]});
  }
}