import {Component, Input, OnInit} from '@angular/core';
import {HttpVpsService} from '../../providers/http-vps.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {WarnDialogComponent} from '../warnning-dialog/warn-dialog.component';
import {Store} from '../../model/UserDataKeys';

@Component({
  selector: 'app-vps-common',
  templateUrl: './vps-common.component.html',
  styleUrls: ['./vps-common.component.scss']
})
export class VpsCommonComponent implements OnInit {

  @Input() key: string;
  @Input() veid: string;
  enableOs: Array<string>;
  currentOs: string;
  selectedOs: string;
  prevPwd: string;
  canRestPwd = true;
  private Store = require('electron-store');
  store: Store = new this.Store();

  constructor(private api: HttpVpsService, private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getOs();
    if (this.store.has(`${this.veid}_root`)) {
      this.prevPwd = this.store.get(`${this.veid}_root`, '');
    }
  }


  getOs() {
    this.api.availableOS(this.veid, this.key)
      .subscribe(res => {
        this.enableOs = res.templates;
        this.currentOs = res.installed;
      });
  }

  checkoutReinstallOs() {
    this.showDialog((res) => {
      if (res) {
        this.api.reInstallOS(this.veid, this.key, this.selectedOs).subscribe(() => {
          this.snackBar.open('install new os task run in background', 'Get it', {duration: 5 * 1000});
        });
      }
    });
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
