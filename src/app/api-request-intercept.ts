import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {base} from './model/API';
import {ApiBase} from './model/ApiTypes';
import {MatSnackBar} from '@angular/material';
import {Injectable} from '@angular/core';

@Injectable()
export class ApiRequestIntercept implements HttpInterceptor {
  constructor(private snack: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(base)) {// is calling api
      return next.handle(req).pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {
              const body: ApiBase = event.body;
              if (body.error !== 0) {
                this.snack.open(`${body.error}`, 'Okay');
              }
            }
          },
          err => {
            this.snack.open('network error please check your network environment', 'Okay');
          }
        ));
    } else {
      return next.handle(req);
    }
  }
}
