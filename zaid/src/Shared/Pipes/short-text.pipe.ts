import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText'
})
export class ShortTextPipe implements PipeTransform {

  transform(value: any, args?: any): string {
    let result=""
    for (let index = 0; index < value.length; index++) {
      result += value[index];
      if(index==18){ result+="...";break;}
        
    }
    return result;
  }

}
