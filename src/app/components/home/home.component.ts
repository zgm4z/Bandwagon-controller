import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AddNewServerDialogComponent} from '../add-new-server-dialog/add-new-server-dialog.component';
import {ServerModel} from '../../model/ServerModel';
import {servers, Store} from '../../model/UserDataKeys';
import {HttpVpsService} from '../../providers/http-vps.service';
import {RateLimit} from '../../model/ApiTypes';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   savedServers: Array<ServerModel>;
  store: Store;

  constructor(private addNewServerDialog: MatDialog, private snackBar: MatSnackBar, private api: HttpVpsService) {

  }

  ngOnInit() {
    const store = require('electron-store');
    this.store = new store();
    if (this.store.has(servers)) {
      this.savedServers = this.store.get(servers);
    } else {
      this.savedServers = [];
    }
  }

  addNewServer() {
    const dialogRef = this.addNewServerDialog.open(AddNewServerDialogComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res instanceof ServerModel) {
        const wasInclude = this.savedServers.find((test) => test.api_veid === res.api_veid);
        if (wasInclude || this.checkServerExist(res)) {
          this.snackBar.open('Server was exist or config error', 'OKay', {duration: 5 * 1000});
        } else {
          this.savedServers.push(res);
          this.store.set(servers, this.savedServers);
        }
      }
    });
  }

  async checkServerExist(server: ServerModel) {
    const res: RateLimit = await this.api.rateLimitState(server.api_veid, server.api_key).toPromise();
    return res.error !== 0;
  }
}
