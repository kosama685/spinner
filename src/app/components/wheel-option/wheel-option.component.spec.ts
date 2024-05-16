import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WheelOptionComponent} from './wheel-option.component';

describe('WheelOptionComponent', () => {
  let component: WheelOptionComponent;
  let fixture: ComponentFixture<WheelOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WheelOptionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WheelOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
