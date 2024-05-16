import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOptionsAdvancedListComponent } from './card-options-advanced-list.component';

describe('CardOptionsAdvancedListComponent', () => {
  let component: CardOptionsAdvancedListComponent;
  let fixture: ComponentFixture<CardOptionsAdvancedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardOptionsAdvancedListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardOptionsAdvancedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
