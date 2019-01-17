import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerDetailItemComponent } from './server-detail-item.component';

describe('ServerDetailItemComponent', () => {
  let component: ServerDetailItemComponent;
  let fixture: ComponentFixture<ServerDetailItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerDetailItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerDetailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
