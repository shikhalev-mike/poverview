import { Injectable } from '@angular/core';
import { environment } from './environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pkg } from './pkg.model';

@Injectable({
  providedIn: 'root'
})
export class PkgService {
  private url = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Pkg[]> {
    return this.http.get<Pkg[]>(this.url);
  }

  get(id: number): Observable<Pkg> {
    return this.http.get<Pkg>(`${this.url}/packages/${id}`);
  }

  getDepend(id: number): Observable<Pkg> {
    return this.http.get<Pkg>(`${this.url}/packages/${id}/dependencies`);
  }
}
