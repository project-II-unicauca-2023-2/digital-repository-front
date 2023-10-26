/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Asidem2Component } from './asidem2.component';

describe('Asidem2Component', () => {
  let component: Asidem2Component;
  let fixture: ComponentFixture<Asidem2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Asidem2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Asidem2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
