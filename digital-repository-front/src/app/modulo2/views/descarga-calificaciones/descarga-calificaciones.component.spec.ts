import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargaCalificacionesComponent } from './descarga-calificaciones.component';

describe('DescargaCalificacionesComponent', () => {
  let component: DescargaCalificacionesComponent;
  let fixture: ComponentFixture<DescargaCalificacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescargaCalificacionesComponent]
    });
    fixture = TestBed.createComponent(DescargaCalificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
