import {Component, Input, OnInit} from '@angular/core';
import {HttpVpsService} from '../../providers/http-vps.service';
import {VpsUsageRaw} from '../../model/ApiTypes';
import {DatePipe} from '@angular/common';
import {ByteUperPipe} from '../../pipes/byteUper.pipe';

@Component({
  selector: 'app-vps-detail-statistic',
  templateUrl: './vps-detail-statistic.component.html',
  styleUrls: ['./vps-detail-statistic.component.scss']
})
export class VpsDetailStatisticComponent implements OnInit {
  cpuOptions: any;
  networkOptions: any;
  diskOptions: any;
  @Input() veid: string;
  @Input() key: string;
  private date: Array<string> = [];
  private cpuData: Array<number> = [];
  private networkIn: Array<number> = [];
  private networkOut: Array<number> = [];
  private diskW: Array<number> = [];
  private diskR: Array<number> = [];
  private datePipe = new DatePipe('en-US');
  private tracePipe = new ByteUperPipe();

  constructor(private api: HttpVpsService) {
  }

  ngOnInit() {
    this.requestData();
  }

  requestData() {
    this.api.rawUsageStats(this.veid, this.key)
      .subscribe(res => {
        res.data.filter((item) => {
          const dataDay = this.datePipe.transform(item.timestamp * 1000, 'yyyy-MM-dd');
          const today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
          return dataDay === today;
        }).forEach(item => {
          this.date.push(this.datePipe.transform(item.timestamp * 1000, 'HH:mm:ss'));
          this.cpuData.push(item.cpu_usage);
          this.networkIn.push(this.tracePipe.transform(item.network_in_bytes, 'MB'));
          this.networkOut.push(this.tracePipe.transform(item.network_out_bytes, 'MB'));
          this.diskR.push(this.tracePipe.transform(item.disk_read_bytes, 'MB'));
          this.diskW.push(this.tracePipe.transform(item.disk_write_bytes, 'MB'));
        });
        this.buildCpuOption();
        this.buildNetworkOption();
        this.buildDiskOption();
      });
  }

  buildCpuOption() {
    this.cpuOptions = {
      title: {
        text: 'CPU Usage',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        show: false,
        feature: {
          mark: {show: true},
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.date
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: '{value} %'
          }
        }
      ],
      series: [
        {
          name: 'usage',
          type: 'line',
          data: this.cpuData
        }
      ]
    };
  }

  buildNetworkOption() {
    this.networkOptions = {
      title: {
        text: 'Network I/O',
        left: 'center',
        top: 20
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['IN', 'OUT']
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.date
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: '{value} MB'
          }
        }
      ],
      series: [
        {
          name: 'IN',
          type: 'line',
          data: this.networkIn,
        },
        {
          name: 'OUT',
          type: 'line',
          data: this.networkOut
        }
      ]
    };

  }

  buildDiskOption() {
    this.diskOptions = {
      title: {
        text: 'Storage I/O',
        left: 'center',
        top: 20
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['write', 'read']
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.date
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: '{value} MB/s'
          }
        }
      ],
      series: [
        {
          name: 'read',
          type: 'line',
          data: this.diskR,
        },
        {
          name: 'write',
          type: 'line',
          data: this.diskW
        }
      ]
    };
  }

}
