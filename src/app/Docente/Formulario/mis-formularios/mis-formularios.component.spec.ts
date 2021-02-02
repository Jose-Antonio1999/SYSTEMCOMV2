import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisFormulariosComponent } from './mis-formularios.component';

describe('MisFormulariosComponent', () => {
  let component: MisFormulariosComponent;
  let fixture: ComponentFixture<MisFormulariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisFormulariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
