import { NgModule } from '@angular/core';
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
import { HttpClientModule } from '@angular/common/http';
import { ExerciseTableComponent } from './Components/exercise-table/exercise-table.component';

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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
