import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseMessagingService } from './Services/firebase-messaging.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Messaging, getMessaging, getToken, onMessage } from 'firebase/messaging';
import { BehaviorSubject } from 'rxjs';
import { firebaseConfig } from 'src/environments/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent implements OnInit {

//   private readonly messaging = inject(getMessaging);
//   private readonly messageSource = new BehaviorSubject<any>(null);
//   message$ = this.messageSource.asObservable();
//   constructor(private fireMessaging: AngularFireMessaging) {}

  // ngOnInit() {
  //   this.fireMessaging.requestPermission.subscribe({
  //     next:(res) => {
  //       console.log('Permission granted:', res);
  //       // setTimeout(() => {
          
  //       // }, 2000);
  //       this.fireMessaging.getToken.subscribe({
  //         next:(res)=>{
  //           console.log("token",res);
  //         },
  //         error:(err)=>{console.log(err);
  //         }
  //       })
  //     },
  //     error:(err) => {
  //       console.error('Permission denied:', err);
  //     }
  // });

  //   this.fireMessaging.messages.subscribe((payload) => {
  //     console.log('Message received:', payload);
  //   });

    // this.fireMessaging.getToken.subscribe(
    //   (token) => {
    //     console.log('FCM Token:', token);
    //   }
    // );

  // }
// }
export class AppComponent implements OnInit {
  private readonly messageSource = new BehaviorSubject<any>(null);
  message$ = this.messageSource.asObservable();

  title = 'fcm-angular-demo';

  ngOnInit(): void {
    // Initialize Firebase
    const app = initializeApp(environment.firebaseConfig);
    const appMessaging = getMessaging(app); // Firebase Messaging instance

    // Request permission to receive notifications
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Permission granted');
        this.getToken(appMessaging);
      } else {
        console.log('Permission denied');
      }
    });

    // Listen for messages when the app is in the foreground
    onMessage(appMessaging, (payload) => {
      console.log('Message received: ', payload);
      this.messageSource.next(payload);
    });
  }

  getToken(appMessaging: Messaging) {
    getToken(appMessaging, { vapidKey: 'BALJFYNnynjiOCmOcFQFY2j8I1oMjQ11uYkqnf7EUmO84SJBubiPQsJgQVOcmycUqP5_SXSjP-CNXSNxNXHlpGk' }).then((currentToken) => {
      if (currentToken) {
        console.log('FCM Token: ', currentToken);
        // Send the token to your server and update the UI if necessary
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }
}