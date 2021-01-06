import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaApoderadosDocenteComponent } from './lista-apoderados-docente.component';

describe('ListaApoderadosDocenteComponent', () => {
  let component: ListaApoderadosDocenteComponent;
  let fixture: ComponentFixture<ListaApoderadosDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaApoderadosDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaApoderadosDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
