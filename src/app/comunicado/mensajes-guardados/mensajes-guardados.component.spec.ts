import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesGuardadosComponent } from './mensajes-guardados.component';

describe('MensajesGuardadosComponent', () => {
  let component: MensajesGuardadosComponent;
  let fixture: ComponentFixture<MensajesGuardadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajesGuardadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajesGuardadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
