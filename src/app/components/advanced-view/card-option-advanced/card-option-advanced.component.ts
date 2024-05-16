import { Component, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatFabButton,
  MatIconButton,
  MatMiniFabButton,
} from '@angular/material/button';
import { OptionsService } from '../../../services/options.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { BehaviorSubject, Subject } from 'rxjs';
import { CardOptionAdvancedEditComponent } from '../card-option-advanced-edit/card-option-advanced-edit.component';
import { WheelOption } from '../../wheel-option/wheel-option';
import { MatTooltip } from '@angular/material/tooltip';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-card-option-advanced',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabButton,
    NgIf,
    MatFormField,
    MatInput,
    MatLabel,
    AsyncPipe,
    CardOptionAdvancedEditComponent,
    MatFabButton,
    MatTooltip,
    CdkDrag,
    MatSlider,
    MatSliderThumb,
    MatIconButton,
    ColorPickerModule,
  ],
  templateUrl: './card-option-advanced.component.html',
  styleUrl: './card-option-advanced.component.less',
})
export class CardOptionAdvancedComponent implements OnInit {
  @Input() index: number;
  @Input() title: string;
  @Input() backgroundColor: string;
  @Input() isEdit: boolean = false;

  isEditing: Subject<boolean> = new BehaviorSubject(false);

  constructor(protected optionsService: OptionsService) {}

  ngOnInit() {
    if (this.isEdit !== undefined) {
      this.isEditing.next(this.isEdit);
    }
  }

  onEdit(): void {
    this.setEditView();
  }

  setEditView(): void {
    this.isEditing.next(true);
  }

  setNormalView(): void {
    this.isEditing.next(false);
  }

  save(title: WheelOption['title']): void {
    this.optionsService.renameOption(this.index, title);
  }

  onDuplicate() {
    this.optionsService.duplicate(this.index);
  }

  onDragAndDrop() {}

  onRemove(): void {
    this.optionsService.removeOption(this.index);
  }

  onColorChange(color: string) {
    this.optionsService.updateBackgroundColor(this.index, color);
  }
}
