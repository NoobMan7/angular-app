import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, lastValueFrom, map } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMessagingService {
  currentMessage = new BehaviorSubject<any>(null);

  constructor(private afMessaging: AngularFireMessaging) { }

  getPermission(): Observable<any> {
    return this.afMessaging.requestToken;
  }

  receiveMessage(): Observable<any> {
    return this.afMessaging.messages;
  }
 
}
