import { TestBed } from '@angular/core/testing';

import { OtherItemService } from './otheritem.service';

describe('OtherItemService', () => {
  let service: OtherItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});