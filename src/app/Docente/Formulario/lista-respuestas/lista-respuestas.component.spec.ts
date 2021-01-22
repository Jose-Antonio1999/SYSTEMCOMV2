import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRespuestasComponent } from './lista-respuestas.component';

describe('ListaRespuestasComponent', () => {
  let component: ListaRespuestasComponent;
  let fixture: ComponentFixture<ListaRespuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRespuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRespuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
