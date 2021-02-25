import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: Array<any>, ...args: unknown[]): Array<any> {
    return value.slice().reverse();
  }

}
