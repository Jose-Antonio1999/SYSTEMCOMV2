import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEstudiantesDocenteComponent } from './lista-estudiantes-docente.component';

describe('ListaEstudiantesDocenteComponent', () => {
  let component: ListaEstudiantesDocenteComponent;
  let fixture: ComponentFixture<ListaEstudiantesDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEstudiantesDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEstudiantesDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
