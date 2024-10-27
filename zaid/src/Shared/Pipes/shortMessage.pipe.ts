import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortMessage'
})
export class ShortMessagePipe implements PipeTransform {

  transform(value: any, args?: any): string {
    let result=""
    for (let index = 0; index < value.length; index++) {
      result += value[index];
      if(index==15){ result+="...";break;}

    }
    return result;
  }

}
