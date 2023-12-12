/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConsultaContratos2Component } from './consulta-contratos2.component';

describe('ConsultaContratos2Component', () => {
  let component: ConsultaContratos2Component;
  let fixture: ComponentFixture<ConsultaContratos2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaContratos2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaContratos2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
