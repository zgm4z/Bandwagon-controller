import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-server-detail',
  templateUrl: './server-detail.component.html',
  styleUrls: ['./server-detail.component.scss']
})
export class ServerDetailComponent implements OnInit {

   key: string;
   name: string;
   veid: string;

  constructor(private activateRouter: ActivatedRoute) {

  }

  ngOnInit() {
    this.activateRouter.queryParamMap.subscribe(p => {
      this.veid = p.get('veid');
      this.key = p.get('key');
      this.name = p.get('name');
    });
  }

}
