import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from 'src/main';

@Injectable({
  providedIn: 'root'
})


export class CasoService {

  constructor(private http:HttpClient) { }

  getCasos():Observable<any> {
    return this.http.get(`${URL}/infection`);
  }
}
