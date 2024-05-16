import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOptionAdvancedAddComponent } from './card-option-advanced-add.component';

describe('CardOptionAdvancedAddComponent', () => {
  let component: CardOptionAdvancedAddComponent;
  let fixture: ComponentFixture<CardOptionAdvancedAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardOptionAdvancedAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardOptionAdvancedAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
