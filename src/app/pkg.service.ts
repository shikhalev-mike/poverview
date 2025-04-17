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
    return this.http.get<Pkg[]>(`${this.url}/packages`);
  }

  get(id: string): Observable<Pkg> {
    return this.http.get<Pkg>(`${this.url}/packages/${id}`);
  }

  getDependencies(id: string): Observable<string[]> {
    const encodedId = encodeURIComponent(id);
    return this.http.get<string[]>(`${this.url}/packages/${encodedId}/dependencies`);
  }
}
