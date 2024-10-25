import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Measurements } from '../Models/measurement';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  private apiUrl = environment.baseUrl; // Replace with your actual API URL


  //this is by body part name for dateMeasured and size history 
  private bodyPartDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any>([]);
  bodyPartData$ = this.bodyPartDataSubject.asObservable();


  constructor(private http: HttpClient) { }
  addMeasurement(data: Measurements): Observable<Measurements> {
    return this.http.post<Measurements>(`${this.apiUrl}/Measurements`, data);
  }
  getDataByName(bodyPartName:string):Observable<any> {
    return this.http.get(`${this.apiUrl}/Measurements/Measurements?name=${bodyPartName}`);
  }
  getMeasurements(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Measurements`);
  }



    // Method to get size history for body part name
    selectBodyPartData(bodyPart: Measurements[]): void {
      console.log(bodyPart);
      
      this.bodyPartDataSubject.next(bodyPart);
    }
}
