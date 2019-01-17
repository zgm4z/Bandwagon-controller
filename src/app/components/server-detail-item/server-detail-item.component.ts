import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-server-detail-item',
  templateUrl: './server-detail-item.component.html',
  styleUrls: ['./server-detail-item.component.scss']
})
export class ServerDetailItemComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;

  constructor() {
  }

  ngOnInit() {
  }

}
