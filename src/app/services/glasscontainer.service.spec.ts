import { TestBed } from '@angular/core/testing';

import { GlassContainerService } from './glasscontainer.service';

describe('GlassContainerService', () => {
  let service: GlassContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlassContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});