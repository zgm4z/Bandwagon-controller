import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinstallOSComponent } from './reinstall-os.component';

describe('ReinstallOSComponent', () => {
  let component: ReinstallOSComponent;
  let fixture: ComponentFixture<ReinstallOSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReinstallOSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReinstallOSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
