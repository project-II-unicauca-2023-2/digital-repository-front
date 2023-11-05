import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarDescargarComponent } from './mostrar-descargar.component';

describe('MostrarDescargarComponent', () => {
  let component: MostrarDescargarComponent;
  let fixture: ComponentFixture<MostrarDescargarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarDescargarComponent]
    });
    fixture = TestBed.createComponent(MostrarDescargarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
