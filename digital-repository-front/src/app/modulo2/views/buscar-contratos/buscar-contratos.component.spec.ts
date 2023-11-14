import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarContratosComponent } from './buscar-contratos.component';

describe('BuscarContratosComponent', () => {
  let component: BuscarContratosComponent;
  let fixture: ComponentFixture<BuscarContratosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarContratosComponent]
    });
    fixture = TestBed.createComponent(BuscarContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
