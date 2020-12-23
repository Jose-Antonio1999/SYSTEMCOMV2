import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalDocenteComponent } from './principal-docente.component';

describe('PrincipalDocenteComponent', () => {
  let component: PrincipalDocenteComponent;
  let fixture: ComponentFixture<PrincipalDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
