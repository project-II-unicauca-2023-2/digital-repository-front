import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirInfoComponent } from './subir-info.component';

describe('SubirInfoComponent', () => {
  let component: SubirInfoComponent;
  let fixture: ComponentFixture<SubirInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubirInfoComponent]
    });
    fixture = TestBed.createComponent(SubirInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
