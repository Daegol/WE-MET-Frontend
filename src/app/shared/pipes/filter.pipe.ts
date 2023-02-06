import { Pipe, PipeTransform } from '@angular/core';

//usage in template: [personnel]="(personnel$ | async) | filterOnProp: { prop: 'id', value: '33ab7886-9eab-468b-9420-0e0098c312c3' }"
@Pipe({ name: 'filterOnProp' })
export class FilterOnPropPipe implements PipeTransform {
  transform(list: any[], filter: FilterProps) {
    return list.filter(item => item[filter.prop] === filter.value);
  }
}

export class FilterProps {
  prop: string;
  value: string;
}
