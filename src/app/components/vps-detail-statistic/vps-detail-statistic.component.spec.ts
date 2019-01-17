import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpsDetailStatisticComponent } from './vps-detail-statistic.component';

describe('VpsDetailStatisticComponent', () => {
  let component: VpsDetailStatisticComponent;
  let fixture: ComponentFixture<VpsDetailStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpsDetailStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpsDetailStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
