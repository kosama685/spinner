import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { WheelOptionComponent } from '../wheel-option/wheel-option.component';
import { Observable, Subscription, take } from 'rxjs';
import { WheelOption } from '../wheel-option/wheel-option';
import { OptionsService } from '../../services/options.service';
import { WinnerOptionNotificationService } from '../../services/winner-option-notification.service';
import { WheelSoundsService } from '../../services/wheel-sounds.service';

const ROTATION_DEGREES_MIN: number = 1500;
const ROTATION_DEGREES_MAX: number = 2500;
export const SPIN_TIMEOUT_MS = 4000;

@Component({
  selector: 'app-wheel',
  standalone: true,
  imports: [CommonModule, NgForOf, WheelOptionComponent],
  templateUrl: './wheel.component.html',
  styleUrl: './wheel.component.less',
})
export class WheelComponent implements OnInit, OnDestroy {
  isDisabledSubscription: Subscription;
  winnerOptionIndexSubscription: Subscription;

  circles: undefined[] = Array.from(Array(20));
  options: Observable<WheelOption[]>;
  isDisabled: boolean;
  isSpinning: boolean;

  rotationDegrees: number = 0;

  winnerOption: WheelOption | undefined;

  constructor(
    private optionsService: OptionsService,
    private winnerOptionsNotificationService: WinnerOptionNotificationService,
    private tickSoundService: WheelSoundsService
  ) {}

  get rotationRandomDegrees() {
    const min = Math.ceil(ROTATION_DEGREES_MIN);
    const max = Math.floor(ROTATION_DEGREES_MAX);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnInit() {
    this.options = this.optionsService.options;
    this.isDisabledSubscription = this.optionsService.isDisabled.subscribe(
      isDisabled => {
        this.isDisabled = isDisabled;
      }
    );
    this.winnerOptionIndexSubscription =
      this.winnerOptionsNotificationService.winnerOptionIndex.subscribe(
        winnerOptionIndex => {
          this.options.pipe(take(1)).subscribe(options => {
            if (options[winnerOptionIndex]) {
              this.winnerOption = options[winnerOptionIndex];
            }
          });
        }
      );
  }

  ngOnDestroy() {
    this.isDisabledSubscription.unsubscribe();
    this.winnerOptionIndexSubscription.unsubscribe();
  }

  onSpin(): void {
    if (!this.isDisabled && !this.isSpinning) {
      this.isSpinning = true;
      this.rotationDegrees += this.rotationRandomDegrees;
      this.tickSoundService.start();
      this.optionsService.startSpin();

      setTimeout(() => {
        this.optionsService.endSpin();
        this.isSpinning = false;

        this.winnerOptionsNotificationService.updateWinnerOptionIndex();
        if (this.winnerOption) {
          this.winnerOptionsNotificationService.openDialog(this.winnerOption);
        }
      }, SPIN_TIMEOUT_MS);
    }
  }
}
