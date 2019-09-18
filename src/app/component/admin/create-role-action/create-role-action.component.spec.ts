import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoleActionComponent } from './create-role-action.component';

describe('CreateRoleActionComponent', () => {
  let component: CreateRoleActionComponent;
  let fixture: ComponentFixture<CreateRoleActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRoleActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoleActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
