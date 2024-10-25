import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../Models/clients';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = environment.baseUrl; //  API URL
  afAuth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/Client`);
  }

  getClientById(id: any): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  async addClient(client: any): Promise<Observable<Client>> {
    console.log(client);
    const formData = new FormData();
    
    formData.append('Name',client.name);

    formData.append('Email',client.email);
    formData.append('Password', client.password);
    formData.append('Phone', client.phone);
    formData.append('Plan', client.plan);
    formData.append('JoiningDate', client.joiningDate);
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(client.email,client.password);
      const userId = userCredential.user?.uid;
      if(userId){
        formData.append('FirebaseUserId', userId);
      }
       
      const userData = {
        name: client.email.split('@')[0], // Default to the part before '@' in email
        email: client.email,
        role: "gym user"
      };
console.log(userData);

      if (userId) {
        await this.firestore.collection('users').doc(userId).set(userData);
        console.log('User data saved successfully');
      }
    } 
     catch (error) {
      console.error("Error signing up with email and password", error);
      throw error;
    }
    return this.http.post<Client>(`${this.apiUrl}/Client`, formData);
  }

  updateClient(id: any, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/Client/edit/${id}`, client);
  }

  deleteClient(id: any): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Client/delete/${id}`);
  }
  check(): Observable<void> {
    return this.http.get<any>(`https://localhost:7286/api/User/profile`);
  }
}
