import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaArchivoComponent } from './carga-archivo.component';

describe('CargaArchivoComponent', () => {
  let component: CargaArchivoComponent;
  let fixture: ComponentFixture<CargaArchivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargaArchivoComponent]
    });
    fixture = TestBed.createComponent(CargaArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
