import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpsCommonComponent } from './vps-common.component';

describe('VpsCommonComponent', () => {
  let component: VpsCommonComponent;
  let fixture: ComponentFixture<VpsCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpsCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpsCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
