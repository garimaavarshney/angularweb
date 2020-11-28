import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Settings } from '../config/constants';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HttpDataService {

  CONST = Settings.CONSTANTS;

  constructor(
    public http: HttpClient
  ) { }

  getApis(url): Observable<any> {
    let _url = this.CONST.API_ENDPOINT + url;
    return this.http.get(_url).pipe(
      timeout(this.CONST.timeout_period));
  }

  postApis(data, url): Observable<any> {
    let _url = this.CONST.API_ENDPOINT + url;
    return this.http.post(_url, data).pipe(
      timeout(this.CONST.timeout_period)
    );
  }

}
