import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTutorComponent } from './info-tutor.component';

describe('InfoTutorComponent', () => {
  let component: InfoTutorComponent;
  let fixture: ComponentFixture<InfoTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
