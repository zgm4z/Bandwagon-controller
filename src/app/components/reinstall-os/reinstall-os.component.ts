import {Component, Input, OnInit} from '@angular/core';
import {HttpVpsService} from '../../providers/http-vps.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {WarnDialogComponent} from '../warnning-dialog/warn-dialog.component';

@Component({
  selector: 'app-reinstall-os',
  templateUrl: './reinstall-os.component.html',
  styleUrls: ['./reinstall-os.component.scss']
})
export class ReinstallOSComponent implements OnInit {

  constructor(private api: HttpVpsService, private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  enableOs: Array<string>;
  currentOs: string;
  selectedOs: string;
  @Input() key: string;
  @Input() veid: string;

  ngOnInit() {
    this.getOs();
  }

  showDialog(afterClose: Function) {
    const ref = this.dialog.open(WarnDialogComponent);
    ref.afterClosed().subscribe(v => afterClose(v));
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

}
