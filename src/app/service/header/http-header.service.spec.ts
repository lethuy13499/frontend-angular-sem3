import { TestBed } from '@angular/core/testing';

import { HttpHeaderService } from './http-header.service';

describe('HttpHeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpHeaderService = TestBed.get(HttpHeaderService);
    expect(service).toBeTruthy();
  });
});
