import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'breakText'
})
export class BreakTextPipe implements PipeTransform {
  transform(value: string): string {

    console.log('testtt');
    if (!value) return value;

    let result = '';
    let words = value.split(' ');
    let lineLength = 0;

    for (let word of words) {
      if (lineLength + word.length > 15) {
        result += '\n';
        lineLength = 0;
      }
      result += word + ' ';
      lineLength += word.length + 1; // Account for space after word
    }

    return result.trim();
  }
}
