import { TestBed } from '@angular/core/testing';

import { WheelSoundsService } from './wheel-sounds.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('WheelSoundsService', () => {
  let service: WheelSoundsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [NoopAnimationsModule] });
    service = TestBed.inject(WheelSoundsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
