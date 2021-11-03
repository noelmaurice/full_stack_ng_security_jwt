import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPlural'
})
export class CustomPluralPipe implements PipeTransform {

  transform(input: number, customPluralForm: string = 's'): string
  {
    return input > 1 ? customPluralForm : ''
  }

}
