import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponerFormularioComponent } from './responer-formulario.component';

describe('ResponerFormularioComponent', () => {
  let component: ResponerFormularioComponent;
  let fixture: ComponentFixture<ResponerFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponerFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponerFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
