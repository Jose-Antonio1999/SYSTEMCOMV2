import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelFormularioComponent } from './panel-formulario.component';

describe('PanelFormularioComponent', () => {
  let component: PanelFormularioComponent;
  let fixture: ComponentFixture<PanelFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
