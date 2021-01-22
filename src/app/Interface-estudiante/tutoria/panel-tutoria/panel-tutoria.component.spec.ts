import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTutoriaComponent } from './panel-tutoria.component';

describe('PanelTutoriaComponent', () => {
  let component: PanelTutoriaComponent;
  let fixture: ComponentFixture<PanelTutoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelTutoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTutoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
