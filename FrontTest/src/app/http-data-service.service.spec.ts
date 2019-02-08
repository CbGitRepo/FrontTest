import { TestBed } from '@angular/core/testing';

import { HttpDataServiceService } from './http-data-service.service';

describe('HttpDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpDataServiceService = TestBed.get(HttpDataServiceService);
    expect(service).toBeTruthy();
  });
});
