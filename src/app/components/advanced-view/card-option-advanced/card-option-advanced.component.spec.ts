import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOptionAdvancedComponent } from './card-option-advanced.component';

describe('CardOptionAdvancedComponent', () => {
  let component: CardOptionAdvancedComponent;
  let fixture: ComponentFixture<CardOptionAdvancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardOptionAdvancedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardOptionAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
