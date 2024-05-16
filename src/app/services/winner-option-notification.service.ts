import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WinnerOptionNotificationComponent } from '../components/winner-option-notification/winner-option-notification.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { WheelOption } from '../components/wheel-option/wheel-option';
import Confetti from '../../confetti';

const WINNER_NOT_DEFINED_INDEX = -1;

@Injectable({
  providedIn: 'root',
})
export class WinnerOptionNotificationService {
  winnerOptionIndex: Subject<number> = new BehaviorSubject<number>(
    WINNER_NOT_DEFINED_INDEX
  );

  constructor(public dialog: MatDialog) {}

  openDialog(winnerOption: WheelOption): void {
    const confetti = new Confetti();
    confetti.poof();

    const dialogRef = this.dialog.open(WinnerOptionNotificationComponent, {
      data: { winner: winnerOption },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.winnerOptionIndex.next(WINNER_NOT_DEFINED_INDEX);
      confetti.stop();
    });
  }

  public updateWinnerOptionIndex(): void {
    const optionsElements: NodeListOf<HTMLElement> =
      document.querySelectorAll('*[data-option]');

    if (optionsElements.length) {
      const optionsTopOffsets = Array.from(optionsElements).map(
        optionElement =>
          optionElement.getBoundingClientRect().top + window.scrollY
      );

      const winnerOptionIndex = optionsTopOffsets.indexOf(
        Math.min(...optionsTopOffsets)
      );

      this.winnerOptionIndex.next(winnerOptionIndex);
    }
  }
}
