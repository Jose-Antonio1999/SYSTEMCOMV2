import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesDocenteComponent } from './ajustes-docente.component';

describe('AjustesDocenteComponent', () => {
  let component: AjustesDocenteComponent;
  let fixture: ComponentFixture<AjustesDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjustesDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
