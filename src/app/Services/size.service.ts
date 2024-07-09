import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Measurements } from '../Models/measurement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  private apiUrl = environment.baseUrl; // Replace with your actual API URL

  constructor(private http: HttpClient) { }
  addMeasurement(data: Measurements): Observable<Measurements> {
    return this.http.post<Measurements>(`${this.apiUrl}/Measurements`, data);
  }
  getDataByName(bodyPartName:string):Observable<any> {
    return this.http.get(`${this.apiUrl}/Measurements`);
  }
}
