import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private apiUrl = environment.baseUrl; // Replace with your actual API URL
  private programSubject = new BehaviorSubject<any[]>([]); // BehaviorSubject to store program data
  constructor(private http: HttpClient) { }

   // Method to fetch programs and update BehaviorSubject
   getPrograms(clientId: string): void {
    this.http.get<any>(`${this.apiUrl}/Program/clientId?userId=${clientId}`).subscribe({
      next:(res)=>{
          this.programSubject.next(res); // Update the BehaviorSubject with fetched data
        },
      error:(err)=>{

      }
      
   });
  }

  // Method to return the observable of the BehaviorSubject
  getProgramObservable(): Observable<any[]> {
    return this.programSubject.asObservable();
  }
  createProgram(program: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Program`, program);
  }
  // getPrograms(clientId:string): Observable<any> {
  //   console.log(clientId);
    
  //   return this.http.get<any>(`${this.apiUrl}/Program/clientId?userId=${clientId}`);
  // }
  editProgram(program:any): Observable<any[]>  {
    console.log(program);
    
    return this.http.put<any>(`${this.apiUrl}/Program`, program);
  }
  deleteProgram(programId:any) {
    return this.http.delete<any>(`${this.apiUrl}/Program?programId=${programId}`);
  }
}
