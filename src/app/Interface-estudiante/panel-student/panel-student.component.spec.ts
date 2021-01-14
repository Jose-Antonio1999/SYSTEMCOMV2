import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelStudentComponent } from './panel-student.component';

describe('PanelStudentComponent', () => {
  let component: PanelStudentComponent;
  let fixture: ComponentFixture<PanelStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
