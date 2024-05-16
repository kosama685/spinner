import { TestBed } from '@angular/core/testing';

import { OptionsService } from './options.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('OptionsService', () => {
  let service: OptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [NoopAnimationsModule] });
    service = TestBed.inject(OptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
