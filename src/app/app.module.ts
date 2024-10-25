import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './Components/main/main.component';
import { HomeComponent } from './Components/home/home.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { NotesComponent } from './Components/notes/notes.component';
import { SizesComponent } from './Components/sizes/sizes.component';
import { BmiComponent } from './Components/bmi/bmi.component';
import { PlansComponent } from './Components/plans/plans.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MeasurementModalComponent } from './Components/Modals/measurement-modal/measurement-modal.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ExerciseTableComponent } from './Components/exercise-table/exercise-table.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './Components/Auth/login/login.component';
import { LogoutComponent } from './Components/Auth/logout/logout.component';
import { ClientListingComponent } from './Components/ClientManagement/client-listing/client-listing.component';
import { ToastrModule } from 'ngx-toastr';
import { Messaging } from '@angular/fire/messaging';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { FirebaseMessagingService } from './Services/firebase-messaging.service';
import { AsyncPipe } from '@angular/common';
import { SizechartComponent } from './Components/Charts/sizechart/sizechart.component';
import { NgChartsModule } from 'ng2-charts';
import { ProgramsComponent } from './Components/programs/programs.component';
import { ApiInterceptor } from './api.interceptor';
import { GymFormWrapperComponent } from './Components/gym-form-wrapper/gym-form-wrapper.component';
import { createCustomElement } from '@angular/elements';
@NgModule({
  declarations: [
    MainComponent,
    AppComponent,
    HomeComponent,
    SidebarComponent,
    NotesComponent,
    SizesComponent,
    BmiComponent,
    PlansComponent,
    MeasurementModalComponent,
    ExerciseTableComponent,
    LoginComponent,
    LogoutComponent,
    ClientListingComponent,
    SizechartComponent,
    ProgramsComponent,
    GymFormWrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBSReoT7gam0Fv8hSLxU5HC5gPR0IVibPk",
      authDomain: "gymuserservice.firebaseapp.com",
      projectId: "gymuserservice",
      storageBucket: "gymuserservice.appspot.com",
      messagingSenderId: "582333373426",
      appId: "1:582333373426:web:ef598d1c31d463183b296b",
      measurementId: "G-5DJT5PS4S4"
  }),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true
    }),
    AngularFireMessagingModule,
    BrowserAnimationsModule,
    NgChartsModule
  ],
  providers: [FirebaseMessagingService,
    AsyncPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
   constructor(private injector: Injector){}
   ngDoBootstrap() {
    const ce = createCustomElement(AppComponent, {injector: this.injector});
    customElements.define('GymForm', ce);
  }
   }
 