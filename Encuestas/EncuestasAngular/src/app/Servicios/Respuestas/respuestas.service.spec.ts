import { TestBed } from '@angular/core/testing';

import { RespuestasService } from './respuestas.service';

describe('RespuestasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RespuestasService = TestBed.get(RespuestasService);
    expect(service).toBeTruthy();
  });
});
