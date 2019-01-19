import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpVpsService} from '../../providers/http-vps.service';
import {KVM, OVZ} from '../../model/ApiTypes';
import {ByteUperPipe} from '../../pipes/byteUper.pipe';
import {Router} from '@angular/router';
import * as url from 'url';
import * as path from 'path';
import {AppConfig} from '../../../environments/environment';
import Timer = NodeJS.Timer;
import {ElectronService} from '../../providers/electron.service';


@Component({
  selector: 'app-server-item',
  templateUrl: './server-item.component.html',
  styleUrls: ['./server-item.component.scss']
})
export class ServerItemComponent implements OnInit, OnDestroy {

  @Input() public key: string;
  @Input() public veid: string;
  @Input() public name: string;
  liveInfo: KVM | OVZ;
  loading = true;
  ram_progress: number;
  ram_total: number;
  ram_used: number;
  disk_bar: number;
  disk_used: number;
  disk_space: number;
  vps_status: string;
  swap_used: number;
  swap_total: number;
  data_used: number;
  private pipe = new ByteUperPipe();
  data_total: number;
  can_action = true;
  load_average: string;
  interval: Timer;

  constructor(private api: HttpVpsService, private els: ElectronService) {
  }

  ngOnInit() {
    this.getInfo();
    this.interval = setInterval(() => {
      this.getInfo();
    }, 60 * 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }


  initCommon() {
    this.data_used = this.pipe.transform(this.liveInfo.data_counter * this.liveInfo.monthly_data_multiplier, 'GB');
    this.data_total = this.pipe.transform(this.liveInfo.plan_monthly_data, 'GB');
  }

  initKvmInfo() {
    const liveInfo = (<KVM>this.liveInfo);
    this.ram_progress = (liveInfo.plan_ram - liveInfo.mem_available_kb * 1024) / liveInfo.plan_ram * 100;
    this.ram_total = this.pipe.transform(liveInfo.plan_ram, 'MB');
    this.ram_used = this.pipe.transform(liveInfo.plan_ram - liveInfo.mem_available_kb * 1024, 'MB');
    this.disk_bar = liveInfo.ve_used_disk_space_b / liveInfo.plan_disk * 100;
    this.disk_used = this.pipe.transform(liveInfo.ve_used_disk_space_b, 'GB');
    this.disk_space = this.pipe.transform(liveInfo.plan_disk, 'GB');
    this.vps_status = liveInfo.ve_status.toLowerCase();
    this.swap_used = this.pipe.transform((liveInfo.swap_total_kb - liveInfo.swap_available_kb) * 1024, 'MB');
    this.swap_total = this.pipe.transform(liveInfo.swap_total_kb * 1024, 'MB');
    this.load_average = liveInfo.load_average;
  }

  doAction(event: string) {
    this.can_action = false;
    switch (event) {
      case 'start': {
        this.start();
      }
        break;
      case 'stop': {
        this.stop();
      }
        break;
      case 'restart': {
        this.restart();
      }
        break;
      case 'kill': {
        this.kill();
      }
        break;
    }
  }

  start() {
    this.api.start(this.veid, this.key).subscribe(i => {
      this.can_action = true;
    });
  }

  stop() {
    this.api.stop(this.veid, this.key).subscribe(i => {
      this.can_action = true;
    });
  }

  restart() {
    this.api.restart(this.veid, this.key).subscribe(i => {
      this.can_action = true;
    });
  }

  kill() {
    this.api.kill(this.veid, this.key).subscribe(i => {
      this.can_action = true;
    });
  }


  getInfo() {
    this.api.liveServiceInfo(this.veid, this.key).subscribe(v => {
      this.loading = false;
      this.liveInfo = v;
      this.initCommon();
      switch (this.liveInfo.vm_type) {
        case 'kvm': {
          this.initKvmInfo();
        }
          break;
        case 'ovz': {
          this.initOvzInfo();
        }
          break;
      }
    });
  }

  initOvzInfo() {
    this.liveInfo = (<OVZ>this.liveInfo);

  }

  goToDetail() {
    this.els.ipcRenderer.send('request-detail', {veid: this.veid, key: this.key, name: name});
  }
}
