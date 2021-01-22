import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPadresComponent } from './lista-padres.component';

describe('ListaPadresComponent', () => {
  let component: ListaPadresComponent;
  let fixture: ComponentFixture<ListaPadresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPadresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPadresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
