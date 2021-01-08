import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDocenteComponent } from './data-docente.component';

describe('DataDocenteComponent', () => {
  let component: DataDocenteComponent;
  let fixture: ComponentFixture<DataDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
