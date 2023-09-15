import { TestBed } from '@angular/core/testing';

import { WoodenToolService } from './woodentool.service';

describe('WoodenToolService', () => {
  let service: WoodenToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WoodenToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});