import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEstudianteComponent } from './panel-estudiante.component';

describe('PanelEstudianteComponent', () => {
  let component: PanelEstudianteComponent;
  let fixture: ComponentFixture<PanelEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
