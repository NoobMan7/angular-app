import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private apiUrl =  environment.baseUrl; // Assuming base URL is set in environment

  constructor(private http: HttpClient) {}

  // Get all workouts
  getAllWorkouts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get a workout by ID
  getWorkoutById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create a new workout
  createWorkout(workout: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Workout`, workout);
  }

  // Update an existing workout
  updateWorkout(id: string, workout: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, workout);
  }

  // Delete a workout by ID
  deleteWorkout(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
