import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegableAniosComponent } from './desplegable-anios.component';

describe('DesplegableAniosComponent', () => {
  let component: DesplegableAniosComponent;
  let fixture: ComponentFixture<DesplegableAniosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesplegableAniosComponent]
    });
    fixture = TestBed.createComponent(DesplegableAniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
