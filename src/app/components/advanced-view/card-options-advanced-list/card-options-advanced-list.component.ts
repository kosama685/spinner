import { Component, Input } from '@angular/core';
import { WheelOption } from '../../wheel-option/wheel-option';
import { CardOptionAdvancedComponent } from '../card-option-advanced/card-option-advanced.component';
import { Observable, take } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton, MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import {
  OptionsService,
  WheelOptionList,
} from '../../../services/options.service';

@Component({
  selector: 'app-card-options-advanced-list',
  standalone: true,
  imports: [
    CardOptionAdvancedComponent,
    NgForOf,
    AsyncPipe,
    MatIcon,
    MatMiniFabButton,
    MatFabButton,
    MatTooltip,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './card-options-advanced-list.component.html',
  styleUrl: './card-options-advanced-list.component.less',
})
export class CardOptionsAdvancedListComponent {
  @Input() options: Observable<WheelOption[]>;

  constructor(private optionsService: OptionsService) {}

  onDrop(event: CdkDragDrop<string[]>) {
    this.optionsService.isSpinning.subscribe(isSpinning => {
      this.options.pipe(take(1)).subscribe(options => {
        if (!isSpinning) {
          const newOptions = [...options];
          const prevIndex = event.previousIndex;
          const newIndex = event.currentIndex;
          const movedOption =
            options[
              prevIndex >= options.length ? options.length - 1 : prevIndex
            ];

          newOptions.splice(prevIndex, 1);
          newOptions.splice(newIndex, 0, movedOption);

          this.optionsService.options.next(new WheelOptionList(...newOptions));
        }
      });
    });
  }
}
