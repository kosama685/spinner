import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { WheelOption } from '../wheel-option/wheel-option';

export interface WinnerOptionNotificationData {
  winner: WheelOption;
}

@Component({
  selector: 'app-winner-option-notification',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './winner-option-notification.component.html',
  styleUrl: './winner-option-notification.component.less',
})
export class WinnerOptionNotificationComponent {
  constructor(
    public dialogRef: MatDialogRef<WinnerOptionNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WinnerOptionNotificationData
  ) {}
}
