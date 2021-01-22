import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaSistemaComponent } from './bienvenida-sistema.component';

describe('BienvenidaSistemaComponent', () => {
  let component: BienvenidaSistemaComponent;
  let fixture: ComponentFixture<BienvenidaSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BienvenidaSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BienvenidaSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
