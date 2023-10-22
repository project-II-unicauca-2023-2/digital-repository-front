import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSiNoComponent } from './dialog-si-no.component';

describe('DialogSiNoComponent', () => {
  let component: DialogSiNoComponent;
  let fixture: ComponentFixture<DialogSiNoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogSiNoComponent]
    });
    fixture = TestBed.createComponent(DialogSiNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
