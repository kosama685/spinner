import { Component } from '@angular/core';
import { OptionsService } from '../../../services/options.service';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-card-option-advanced-add',
  standalone: true,
  imports: [MatIcon, MatFabButton, MatTooltip, AsyncPipe],
  templateUrl: './card-option-advanced-add.component.html',
  styleUrl: './card-option-advanced-add.component.less',
})
export class CardOptionAdvancedAddComponent {
  constructor(protected optionsService: OptionsService) {}

  onAdd() {
    this.optionsService.addOption();
  }
}
