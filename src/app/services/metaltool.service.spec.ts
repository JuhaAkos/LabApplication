import { TestBed } from '@angular/core/testing';

import { MetalToolService } from './metaltool.service';

describe('MetalToolService', () => {
  let service: MetalToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetalToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});