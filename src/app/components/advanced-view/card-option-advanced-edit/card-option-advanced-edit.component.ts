import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatMiniFabButton } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-option-advanced-edit',
  standalone: true,
  imports: [
    AsyncPipe,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatMiniFabButton,
    ReactiveFormsModule,
  ],
  templateUrl: './card-option-advanced-edit.component.html',
  styleUrl: './card-option-advanced-edit.component.less',
})
export class CardOptionAdvancedEditComponent implements OnInit {
  @Input() title: string;

  @Output() save: EventEmitter<string> = new EventEmitter();
  @Output() closeEdit: EventEmitter<void> = new EventEmitter();

  form = new FormGroup({
    titleControl: new FormControl(''),
  });

  ngOnInit() {
    this.form.controls.titleControl.setValue(this.title);
  }

  onEditSave(): void {
    this.save.emit(this.form.controls.titleControl.getRawValue() ?? '');
    this.closeEdit.emit();
  }

  onEditCancel(): void {
    this.closeEdit.emit();
  }
}
