import { TestBed } from '@angular/core/testing';

import { WinnerOptionNotificationService } from './winner-option-notification.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

describe('WinnerOptionNotificationService', () => {
  let service: WinnerOptionNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    });
    service = TestBed.inject(WinnerOptionNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
