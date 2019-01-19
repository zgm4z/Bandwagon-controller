import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrateDcComponent } from './migrate-dc.component';

describe('MigrateDcComponent', () => {
  let component: MigrateDcComponent;
  let fixture: ComponentFixture<MigrateDcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigrateDcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrateDcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
