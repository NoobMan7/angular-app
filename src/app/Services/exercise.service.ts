import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../Models/exercise';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private apiUrl = environment.baseUrl; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiUrl);
  }

  getExerciseById(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.apiUrl}/${id}`);
  }

  createExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(`${this.apiUrl}/Exercise`, exercise);
  }

  updateExercise(id: number, exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.apiUrl}/Exercise/${id}`, exercise);
  }

  deleteExercise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Exercise/${id}`);
  }
}
