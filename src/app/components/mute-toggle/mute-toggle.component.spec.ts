import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuteToggleComponent } from './mute-toggle.component';

describe('MuteToggleComponent', () => {
  let component: MuteToggleComponent;
  let fixture: ComponentFixture<MuteToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuteToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MuteToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
