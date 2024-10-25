import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private afAuth: AngularFireAuth) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Use Firebase Auth to get the current user's token
      return from(this.afAuth.currentUser).pipe(
        switchMap(user => {
          if (user) {
            // If the user is authenticated, get the ID token
            return from(user.getIdToken()).pipe(
              switchMap(token => {
                // Clone the request and add the Authorization header with the token
                const clonedRequest = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${token}`
                  }
                });
                return next.handle(clonedRequest);
              })
            );
          } else {
            // If there's no user logged in, send the request without adding a token
            return next.handle(req);
          }
        })
      );
    }
}
