import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {
  @Input() title: string;
  @Input() icon: string;
  @Input() main: boolean;

  constructor() {
  }

  @Output() addNew: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }

  emitterEvent() {
    this.addNew.emit();
  }
}
