import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  getAvailableOS,
  getLiveServiceInfo, getRateLimitStatus,
  getRawUsageStats,
  getServiceInfo,
  kill,
  reinstallOS,
  resetRootPassword,
  restart, setHostname,
  start,
  stop
} from '../model/API';
import {Observable} from 'rxjs';
import {AvailableOS, KVM, OVZ, RateLimit, ResetPwdResult, ServerInfo, VpsUsageRaw} from '../model/ApiTypes';


@Injectable({
  providedIn: 'root'
})
export class HttpVpsService {
  constructor(private http: HttpClient) {
  }

  public start(veid: string, key: string) {
    return this.http.post(start, null, {
      params: {api_key: key, veid: veid}
    });
  }

  public stop(veid: string, key: string) {
    return this.http.post(stop, null, {
      params: {api_key: key, veid: veid}
    });
  }

  public kill(veid: string, key: string) {
    return this.http.post(kill, null, {
      params: {api_key: key, veid: veid}
    });
  }

  public restart(veid: string, key: string) {
    return this.http.post(restart, null, {
      params: {api_key: key, veid: veid}
    });
  }

  public setNewHostName(veid: string, key: string, newHostName: string) {
    return this.http.post(setHostname, null, {
      params: {api_key: key, veid: veid, newHostname: newHostName}
    });
  }

  public rawUsageStats(veid: string, key: string): Observable<VpsUsageRaw> {
    return this.http.post<VpsUsageRaw>(getRawUsageStats, null, {
      params: {api_key: key, veid: veid}
    });
  }

  public liveServiceInfo(veid: string, key: string): Observable<OVZ | KVM> {
    return this.http.post<OVZ | KVM>(getLiveServiceInfo, null, {
      params: {api_key: key, veid: veid}
    });
  }

  public serviceInfo(veid: string, key: string): Observable<ServerInfo> {
    return this.http.post<ServerInfo>(getServiceInfo, null, {
      params: {api_key: key, veid: veid}
    });
  }

  public availableOS(veid: string, key: string): Observable<AvailableOS> {
    return this.http.post<AvailableOS>(getAvailableOS, null, {
      params: {api_key: key, veid: veid}
    });
  }

  public reInstallOS(veid: string, key: string, os: string) {
    return this.http.post(reinstallOS, null, {
      params: {api_key: key, veid: veid, os: os}
    });
  }

  public resetRootPassword(veid: string, key: string): Observable<ResetPwdResult> {
    return this.http.post<ResetPwdResult>(resetRootPassword, null, {
      params: {api_key: key, veid: veid}
    });
  }

  public rateLimitState(veid: string, key: string): Observable<RateLimit> {
    return this.http.post<RateLimit>(getRateLimitStatus, null, {
      params: {api_key: key, veid: veid}
    });
  }
}
