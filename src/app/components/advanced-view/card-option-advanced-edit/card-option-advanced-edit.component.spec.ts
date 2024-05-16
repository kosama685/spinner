import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOptionAdvancedEditComponent } from './card-option-advanced-edit.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CardOptionAdvancedEditComponent', () => {
  let component: CardOptionAdvancedEditComponent;
  let fixture: ComponentFixture<CardOptionAdvancedEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardOptionAdvancedEditComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardOptionAdvancedEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
