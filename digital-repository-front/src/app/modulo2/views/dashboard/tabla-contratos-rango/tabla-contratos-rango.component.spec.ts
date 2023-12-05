import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaContratosRangoComponent } from './tabla-contratos-rango.component';

describe('TablaContratosRangoComponent', () => {
  let component: TablaContratosRangoComponent;
  let fixture: ComponentFixture<TablaContratosRangoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaContratosRangoComponent]
    });
    fixture = TestBed.createComponent(TablaContratosRangoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
