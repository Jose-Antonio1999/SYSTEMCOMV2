import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDocenteComponent } from './panel-docente.component';

describe('PanelDocenteComponent', () => {
  let component: PanelDocenteComponent;
  let fixture: ComponentFixture<PanelDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
