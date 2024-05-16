import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-wheel-option',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './wheel-option.component.html',
  styleUrl: './wheel-option.component.less',
})
export class WheelOptionComponent {
  @Input() index: number;
  @Input() title: string;
  @Input() optionsSize: number;

  @Input() backgroundColor: string;
  @Input() textColor?: string | undefined;


  get trimmedText(): string {
    if (!this.title) {

      return this.title;
    }

    let result = '';
    let words = this.title.split(' ');
    let lineLength = 0;

    for (let word of words) {
      if (lineLength + word.length > 2) {
        result += '\n';
        lineLength = 0;
      }
      result += word + ' ';
      lineLength += word.length + 1; // Account for space after word


    }
    console.log(result);
    return result.trim();
  }


  get angle(): number {
    return 360 / this.optionsSize;
  }

  get rotateValue(): number {
    return this.index * this.angle;
  }

  get skewValue(): number {
    return 90 - this.angle > 0 ? (90 - this.angle) * -1 : this.angle - 90;
  }

  get titleSkewValue(): number {
    return this.skewValue * -1;
  }
}
