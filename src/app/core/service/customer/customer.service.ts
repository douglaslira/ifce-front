import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public readonly httpService: HttpService) { }

  listAll(): Observable<any> {
    return this.httpService.get('http://localhost:8080/customer').pipe(map(response => {
        return response;
      })
    );
  }

  create(obj: any): Observable<any> {
    return this.httpService.post('http://localhost:8080/customer', obj).pipe(map(response => {
        return response;
      })
    );
  }

  update(obj: any): Observable<any> {
    return this.httpService.put('http://localhost:8080/customer', obj).pipe(map(response => {
        return response;
      })
    );
  }

  delete(obj: any): Observable<any> {
    return this.httpService.delete('http://localhost:8080/customer', obj).pipe(map(response => {
        return response;
      })
    );
  }

}
