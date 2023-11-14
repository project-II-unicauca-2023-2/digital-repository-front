import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaCalificacionComponent } from './linea-calificacion.component';

describe('LineaCalificacionComponent', () => {
  let component: LineaCalificacionComponent;
  let fixture: ComponentFixture<LineaCalificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineaCalificacionComponent]
    });
    fixture = TestBed.createComponent(LineaCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
