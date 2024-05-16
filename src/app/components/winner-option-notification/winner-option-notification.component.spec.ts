import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerOptionNotificationComponent } from './winner-option-notification.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

describe('WinnerOptionNotificationComponent', () => {
  let component: WinnerOptionNotificationComponent;
  let fixture: ComponentFixture<WinnerOptionNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { winner: { title: '' } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WinnerOptionNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
