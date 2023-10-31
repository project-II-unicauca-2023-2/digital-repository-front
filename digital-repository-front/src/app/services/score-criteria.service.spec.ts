import { TestBed } from '@angular/core/testing';

import { ScoreCriteriaService } from './score-criteria.service';

describe('ScoreCriteriaService', () => {
  let service: ScoreCriteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreCriteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
