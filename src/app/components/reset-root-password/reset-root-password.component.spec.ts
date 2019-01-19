import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetRootPasswordComponent } from './reset-root-password.component';

describe('ResetRootPasswordComponent', () => {
  let component: ResetRootPasswordComponent;
  let fixture: ComponentFixture<ResetRootPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetRootPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetRootPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
