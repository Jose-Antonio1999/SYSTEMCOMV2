import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPersonalComponent } from './registro-personal.component';

describe('RegistroPersonalComponent', () => {
  let component: RegistroPersonalComponent;
  let fixture: ComponentFixture<RegistroPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
