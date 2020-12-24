import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDocenteComponent } from './menu-docente.component';

describe('MenuDocenteComponent', () => {
  let component: MenuDocenteComponent;
  let fixture: ComponentFixture<MenuDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
