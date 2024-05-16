import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullToggleComponent } from './full-toggle.component';

describe('FullToggleComponent', () => {
  let component: FullToggleComponent;
  let fixture: ComponentFixture<FullToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
