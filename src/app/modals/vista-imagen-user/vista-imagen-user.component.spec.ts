import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaImagenUserComponent } from './vista-imagen-user.component';

describe('VistaImagenUserComponent', () => {
  let component: VistaImagenUserComponent;
  let fixture: ComponentFixture<VistaImagenUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaImagenUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaImagenUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
