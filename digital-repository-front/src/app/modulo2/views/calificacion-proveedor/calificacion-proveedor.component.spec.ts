import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionProveedorComponent } from './calificacion-proveedor.component';

describe('CalificacionProveedorComponent', () => {
  let component: CalificacionProveedorComponent;
  let fixture: ComponentFixture<CalificacionProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalificacionProveedorComponent]
    });
    fixture = TestBed.createComponent(CalificacionProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
