import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideFiltroComponent } from './aside-filtro.component';

describe('AsideFiltroComponent', () => {
  let component: AsideFiltroComponent;
  let fixture: ComponentFixture<AsideFiltroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsideFiltroComponent]
    });
    fixture = TestBed.createComponent(AsideFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
