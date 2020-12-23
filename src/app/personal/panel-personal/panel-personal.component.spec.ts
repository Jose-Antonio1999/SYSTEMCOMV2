import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPersonalComponent } from './panel-personal.component';

describe('PanelPersonalComponent', () => {
  let component: PanelPersonalComponent;
  let fixture: ComponentFixture<PanelPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
