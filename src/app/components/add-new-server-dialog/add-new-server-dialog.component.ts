import {Component, OnInit} from '@angular/core';
import {ServerModel} from '../../model/ServerModel';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-new-server-dialog',
  templateUrl: './add-new-server-dialog.component.html',
  styleUrls: ['./add-new-server-dialog.component.scss']
})
export class AddNewServerDialogComponent implements OnInit {

   serverModel: ServerModel = new ServerModel();

  constructor(private dialogRef: MatDialogRef<any, any>) {
  }

  ngOnInit() {
  }

  saveServer() {
    this.dialogRef.close(this.serverModel);
  }
}
