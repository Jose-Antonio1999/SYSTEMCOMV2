import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeNotutorComponent } from './mensaje-notutor.component';

describe('MensajeNotutorComponent', () => {
  let component: MensajeNotutorComponent;
  let fixture: ComponentFixture<MensajeNotutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeNotutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeNotutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
