import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'na'
})
export class NaPipe implements PipeTransform {

  transform(value: unknown, param?:string): unknown {
    if(value == '' || value == null || value == undefined){
      if(param != undefined){
        return param;
      }else{
        return '--';
      }
    }else{
      return value;
    }
  }

}
