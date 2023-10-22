import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloLineaComponent } from './titulo-linea.component';

describe('TituloLineaComponent', () => {
  let component: TituloLineaComponent;
  let fixture: ComponentFixture<TituloLineaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TituloLineaComponent]
    });
    fixture = TestBed.createComponent(TituloLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
