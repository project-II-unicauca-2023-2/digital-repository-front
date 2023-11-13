import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoTortaAbanzadoComponent } from './grafico-torta-abanzado.component';

describe('GraficoTortaAbanzadoComponent', () => {
  let component: GraficoTortaAbanzadoComponent;
  let fixture: ComponentFixture<GraficoTortaAbanzadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoTortaAbanzadoComponent]
    });
    fixture = TestBed.createComponent(GraficoTortaAbanzadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
