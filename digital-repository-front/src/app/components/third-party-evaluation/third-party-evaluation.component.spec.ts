import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyEvaluationComponent } from './third-party-evaluation.component';

describe('ThirdPartyEvaluationComponent', () => {
  let component: ThirdPartyEvaluationComponent;
  let fixture: ComponentFixture<ThirdPartyEvaluationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThirdPartyEvaluationComponent]
    });
    fixture = TestBed.createComponent(ThirdPartyEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
