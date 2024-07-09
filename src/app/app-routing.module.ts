import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { NotesComponent } from './Components/notes/notes.component';
import { SizesComponent } from './Components/sizes/sizes.component';
import { BmiComponent } from './Components/bmi/bmi.component';
import { PlansComponent } from './Components/plans/plans.component';

const routes: Routes = [
  { path: 'notes', component: NotesComponent },
  { path: 'sizes', component: SizesComponent },
  { path: 'bmi', component: BmiComponent },
  { path: 'plans', component: PlansComponent },
  {path:'' ,redirectTo:"notes", pathMatch:"full"},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
