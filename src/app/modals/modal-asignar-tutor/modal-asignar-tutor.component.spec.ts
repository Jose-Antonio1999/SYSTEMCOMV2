import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsignarTutorComponent } from './modal-asignar-tutor.component';

describe('ModalAsignarTutorComponent', () => {
  let component: ModalAsignarTutorComponent;
  let fixture: ComponentFixture<ModalAsignarTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAsignarTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAsignarTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
