import {Component, Input, OnInit} from '@angular/core';
import {HttpVpsService} from '../../providers/http-vps.service';
import {MatDialog} from '@angular/material';
import {WarnDialogComponent} from '../warnning-dialog/warn-dialog.component';

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

  constructor(private api: HttpVpsService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getOs();
  }


  getOs() {
    this.api.availableOS(this.veid, this.key)
      .subscribe(res => {
        this.enableOs = res.templates;
        this.currentOs = res.installed;
      });
  }

  showDialog(afterClose: Function) {
    const ref = this.dialog.open(WarnDialogComponent);
    ref.afterClosed().subscribe(afterClose);
  }
}
