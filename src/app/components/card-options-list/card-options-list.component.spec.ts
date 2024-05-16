import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOptionsListComponent } from './card-options-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('OptionsListComponent', () => {
  let component: CardOptionsListComponent;
  let fixture: ComponentFixture<CardOptionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardOptionsListComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardOptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
