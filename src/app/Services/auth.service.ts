import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) { }
  router = inject(Router);
  firestore = inject(AngularFirestore);
  private apiUrl = environment.baseUrl;
  http = inject(HttpClient);
  async signupWithGoogle(role: string) {
  
    const provider = new GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);

    const user = credential.user;
    if (user) {
      const userId = user.uid;
      const userData = {
        name: user.displayName,
        email: user.email,
        role: role // Use the role selected during signup
      };

      await this.firestore.collection('users').doc(userId).set(userData, { merge: true });
      console.log('User data saved successfully');

      // Redirect to a specific page after successful login, e.g., dashboard
      this.router.navigate(['/main']);
    }


  }

  async logout() {
    try {
      await this.afAuth.signOut();
      alert("Successfully Logout");
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  getUser() {
    return this.afAuth.authState;
  }

  async signUp(email: string, password: string, role: string): Promise<void> {
    alert(email+""+password+""+role);
    try {
      // Step 1: Create user in Firebase Authentication
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user?.uid;
  
      // Prepare user data
      const userData = {
        name: email.split('@')[0],  // Default to the part before '@' in email
        email: email,
        role: role
      };
  
      // Prepare FormData for API call
      const formData = new FormData();
      formData.append('FirebaseUserId', userId || '');  // Ensure userId is not null
      formData.append('Email', userData.email);
      formData.append('Role', userData.role);
  console.log(formData);
  
      // // Step 2: Save user data in Firestore
      if (userId) {
        await this.firestore.collection('users').doc(userId).set(userData);
        console.log('User data saved successfully in Firestore');
      }
  
      // Step 3: Make API call to store user data in ASP.NET Core backend
      this.http.post<any>(`${this.apiUrl}/User`,formData).subscribe({
        next: (response) => {
          if (response) {
            console.log('User data saved successfully in backend');
          } else {
            console.error('Failed to save user data in backend');
          }
        },
        error: (error) => {
          console.error('Error saving user data in backend', error);
        }
      });
  
    } catch (error) {
      console.error('Error during sign up', error);
      throw error;
    }
  }
  

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      const userId = userCredential.user?.uid;
      sessionStorage.setItem("firebaseId", userId!);
      console.log(userCredential);
      
    } catch (error) {
      console.error("Error logging in with email and password", error);
      throw error;
    }
  }


  checkUserRole(userId: string) {
    return this.firestore.collection('users').doc(userId).valueChanges().pipe(
      switchMap((userData: any) => {
        if (userData) {
          return of(userData.role);
        } else {
          console.log('User document not found');
          return of(null);
        }
      })
    );
  }

  redirectToGymOwnerDashboard() {
    alert('Redirecting to Gym Owner Dashboard');
    // Implement your redirection logic
    this.router.navigate(['/main']);
  }

  redirectToGymUserDashboard() {
    alert('Redirecting to Gym User Dashboard');
    // Implement your redirection logic
    this.router.navigate(['/main']);
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider).then((credential) => {
      const user = credential.user;

      if (user) {
        this.checkUserRole(user.uid).subscribe((role) => {
          if (role === 'Gym Owner') {
            this.redirectToGymOwnerDashboard();
          } else if (role === 'Gym User') {
            this.redirectToGymUserDashboard();
          } else {
            console.log('Role not defined or other roles');
          }
        });
      }
    }).catch((error) => {
      console.error('Error during Google login', error);
    });
  }

  // / forgot-password

  async resetPassword(email: string): Promise<boolean> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      return true;
    } catch (error) {
      console.error('Error sending password reset email', error);
      return false;
    }
  }

}
