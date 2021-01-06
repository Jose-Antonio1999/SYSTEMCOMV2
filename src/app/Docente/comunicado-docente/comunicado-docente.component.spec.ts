import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadoDocenteComponent } from './comunicado-docente.component';

describe('ComunicadoDocenteComponent', () => {
  let component: ComunicadoDocenteComponent;
  let fixture: ComponentFixture<ComunicadoDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunicadoDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunicadoDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
