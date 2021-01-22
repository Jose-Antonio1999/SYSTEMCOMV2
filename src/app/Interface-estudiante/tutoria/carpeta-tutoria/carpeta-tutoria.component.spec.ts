import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpetaTutoriaComponent } from './carpeta-tutoria.component';

describe('CarpetaTutoriaComponent', () => {
  let component: CarpetaTutoriaComponent;
  let fixture: ComponentFixture<CarpetaTutoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpetaTutoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpetaTutoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
