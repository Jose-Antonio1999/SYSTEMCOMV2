import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalDirectorComponent } from './principal-director.component';

describe('PrincipalDirectorComponent', () => {
  let component: PrincipalDirectorComponent;
  let fixture: ComponentFixture<PrincipalDirectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalDirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
