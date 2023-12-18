import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorCargaIndividualComponent } from './paginador-carga-individual.component';

describe('PaginadorCargaIndividualComponent', () => {
  let component: PaginadorCargaIndividualComponent;
  let fixture: ComponentFixture<PaginadorCargaIndividualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginadorCargaIndividualComponent]
    });
    fixture = TestBed.createComponent(PaginadorCargaIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
