import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionPersonalComponent } from './configuracion-personal.component';

describe('ConfiguracionPersonalComponent', () => {
  let component: ConfiguracionPersonalComponent;
  let fixture: ComponentFixture<ConfiguracionPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
