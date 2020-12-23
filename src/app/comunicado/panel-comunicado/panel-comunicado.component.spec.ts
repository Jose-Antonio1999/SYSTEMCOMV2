import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComunicadoComponent } from './panel-comunicado.component';

describe('PanelComunicadoComponent', () => {
  let component: PanelComunicadoComponent;
  let fixture: ComponentFixture<PanelComunicadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelComunicadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelComunicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
