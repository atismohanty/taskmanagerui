import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
const baseUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private readonly http: HttpClient) { }

  public authenticate(formValue: {username: string, password: string, count: number}): Observable<boolean> {
    const body =  {userName: formValue.username, password: formValue.password, reqNo: formValue.count ?? Math.floor(Math.random() * 10**5)};
    const options = { headers: new HttpHeaders().append('Content-Type', 'application/json')}
    return this.http.post(`${baseUrl}/auth`, body, options).pipe(map((res) => !!res));
  }
}
