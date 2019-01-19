import {Component, Input, OnInit} from '@angular/core';
import {WarnDialogComponent} from '../warnning-dialog/warn-dialog.component';
import {Dc} from '../../model/ApiTypes';
import {HttpVpsService} from '../../providers/http-vps.service';
import {MatDialog, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-migrate-dc',
  templateUrl: './migrate-dc.component.html',
  styleUrls: ['./migrate-dc.component.scss']
})
export class MigrateDcComponent implements OnInit {

  constructor(private api: HttpVpsService, private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  @Input() key: string;
  @Input() veid: string;
  currentDC = '';
  willMoveDC: Dc = {locations: '', desc: '', dataTransferMultiplier: 0};
  dcList: Array<Dc> = [];
   canMigrate = true;

  ngOnInit() {
    this.getDC();
  }

  showDialog(afterClose: Function) {
    const ref = this.dialog.open(WarnDialogComponent);
    ref.afterClosed().subscribe(v => afterClose(v));
  }


  private getDC() {
    this.api.dc_list(this.veid, this.key)
      .subscribe(res => {
        this.currentDC = `${res.currentLocation}/${res.descriptions[res.currentLocation]}`;
        this.dcList = res.locations.map(location => {
          return {
            dataTransferMultiplier: res.dataTransferMultipliers[location],
            desc: res.descriptions[location],
            locations: location
          };
        });
      });
  }

  migrateDc() {
    this.canMigrate = false;
    this.showDialog(res => {
      if (res && this.willMoveDC.locations !== '') {
        this.api.migrate_dc(this.veid, this.key, this.willMoveDC.locations)
          .subscribe(() => this.canMigrate = true);
      } else {
        this.canMigrate = true;
      }
    });

  }
}
