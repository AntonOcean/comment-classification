import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'translateValue'
})
export class TranslateValuePipe implements PipeTransform {
  data = {
    '1.0': 'Негативное',
    '0.0': 'Позитивное'
  };

  transform(value: string, args?: any): string {

    return this.data[value];
  }
}
