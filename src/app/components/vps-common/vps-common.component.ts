import {Component, Input, OnInit} from '@angular/core';
import {HttpVpsService} from '../../providers/http-vps.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {WarnDialogComponent} from '../warnning-dialog/warn-dialog.component';
import {Store} from '../../model/UserDataKeys';
import {Dc} from '../../model/ApiTypes';

@Component({
  selector: 'app-vps-common',
  templateUrl: './vps-common.component.html',
  styleUrls: ['./vps-common.component.scss']
})
export class VpsCommonComponent implements OnInit {

  @Input() key: string;
  @Input() veid: string;

  ngOnInit() {
  }


}
