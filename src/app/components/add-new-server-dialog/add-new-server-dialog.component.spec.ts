import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewServerDialogComponent } from './add-new-server-dialog.component';

describe('AddNewServerDialogComponent', () => {
  let component: AddNewServerDialogComponent;
  let fixture: ComponentFixture<AddNewServerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewServerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewServerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
