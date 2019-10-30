import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UploaderService } from './uploader.service';

describe('UploaderServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: UploaderService = TestBed.get(UploaderService);
    expect(service).toBeTruthy();
  });
});
