import {Component, Input, OnInit} from '@angular/core';
import {HttpVpsService} from '../../providers/http-vps.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {WarnDialogComponent} from '../warnning-dialog/warn-dialog.component';
import {Store} from '../../model/UserDataKeys';

@Component({
  selector: 'app-reset-root-password',
  templateUrl: './reset-root-password.component.html',
  styleUrls: ['./reset-root-password.component.scss']
})
export class ResetRootPasswordComponent implements OnInit {
  @Input() key: string;
  @Input() veid: string;

  prevPwd: string;
  canRestPwd = true;
  private Store = require('electron-store');
  store: Store = new this.Store();

  constructor(private api: HttpVpsService, private dialog: MatDialog) {
  }

  ngOnInit() {
    if (this.store.has(`${this.veid}_root`)) {
      this.prevPwd = this.store.get(`${this.veid}_root`, '');
    }
  }

  showDialog(afterClose: Function) {
    const ref = this.dialog.open(WarnDialogComponent);
    ref.afterClosed().subscribe(v => afterClose(v));
  }

  resetPassword() {
    this.canRestPwd = false;
    this.showDialog((res) => {
      if (res) {
        this.api.resetRootPassword(this.veid, this.key)
          .subscribe(result => {
            this.prevPwd = result.password;
            this.canRestPwd = true;
            this.store.set(`${this.veid}_root`, this.prevPwd);
          });
      }
    });

  }

}
