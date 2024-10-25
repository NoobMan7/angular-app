import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { NotesComponent } from './Components/notes/notes.component';
import { SizesComponent } from './Components/sizes/sizes.component';
import { BmiComponent } from './Components/bmi/bmi.component';
import { PlansComponent } from './Components/plans/plans.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { LogoutComponent } from './Components/Auth/logout/logout.component';
import { MainComponent } from './Components/main/main.component';
import { authGuard } from './guards/auth.guard';
import { ClientListingComponent } from './Components/ClientManagement/client-listing/client-listing.component';
import { ProgramsComponent } from './Components/programs/programs.component';
import { GymFormWrapperComponent } from './Components/gym-form-wrapper/gym-form-wrapper.component';

const routes: Routes = [
  {
    path: "main", component: MainComponent, canActivate: [authGuard], children: [

      { path: 'notes', component: NotesComponent },
      { path: 'sizes', component: SizesComponent },
      { path: 'bmi', component: BmiComponent },
      { path: 'plans', component: PlansComponent },
      { path: 'programs', component: ProgramsComponent},
      { path: 'clients', component: ClientListingComponent},
      {path: 'gym-react', component: GymFormWrapperComponent},
      { path: "", redirectTo: "notes", pathMatch: "full" },
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
