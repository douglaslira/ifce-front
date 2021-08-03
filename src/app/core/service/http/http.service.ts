import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private readonly httpClient: HttpClient
  ) {}

  get(url: string, params?: any): Observable<any> {
    return this.httpCall(url, params);
  }

  post(url: string, body: any, options?: any): Observable<any> {
    return this.httpClient.post(url, body, options);
  }

  put(url: string, body: any, options?: any): Observable<any> {
    return this.httpClient.put(url, body, options);
  }

  delete(url: string, params: any): Observable<any> {
    return this.httpClient.delete(url, { params });
  }

  httpCall(url: string, params: HttpParams): Observable<any> {
    return this.httpClient.get(url, { params }).pipe(
      switchMap(response => {
        return of(response);
      })
    );
  }

}
