import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
email: any;
password: any;
confirmPassword: any;
role:any;
roleSelected:boolean=false;
router = inject(Router);
toastr = inject(ToastrService);
isModalOpen: any;
forgotPasswordEmail: any;
  isGymOwner = false;
  constructor(private authService: AuthService) { }
  newUser:boolean=false;
  ngOnInit(){
    this.role = "Gym User";
  }
  userRoleSelect()
  {
  this.roleSelected = true;
  console.log(this.roleSelected);
  
  }
  googleSignup() {
    if(this.newUser){
    if(this.roleSelected){
    this.authService.signupWithGoogle(this.role).catch(err => {
      console.error('Login failed', err);
    });
  }
  else{
    this.toastr.error('Role Select Kar Bhai!!', 'Error');
  }
  }
  else{
    this.authService.signupWithGoogle(this.role).catch(err => {
      console.error('Login failed', err);
    });
  }
}
  newUserToggle(){
    this.newUser= this.newUser ? false : true;
    console.log(this.newUser);
  }
  async signUp() {
    alert("signup");
    if(this.role && this.email && this.password && this.confirmPassword){
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      try {
        await this.authService.signUp(this.email, this.password,this.role);
        alert('Sign up successful');
        this.router.navigate(['/main'])

      } catch (error) {
        alert(error);
      }
    }
    else{
      this.toastr.warning("Fill all the details");
    }
    
  }

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      alert('Login successful');
      this.router.navigate(['/main'])
    } catch (error) {
      alert(error);
    }
  }
  async googleLogin(){
    this.authService.loginWithGoogle();
  }



  // forgot password

  
  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    // this.isModalOpen = false;
    const modalElement = document.querySelector('.modal');
    if (modalElement) {
      modalElement.classList.add('hide');
      setTimeout(() => {
        this.isModalOpen = false;
        modalElement.classList.remove('hide');
      }, 300); // Match the duration of the CSS transition
    }
  }

  async resetPassword() {
    if (!this.forgotPasswordEmail) {
      this.toastr.error('Please enter your email');
      return;
    }

    var result = await this.authService.resetPassword(this.forgotPasswordEmail);
    alert(result);
    if(result){
      this.toastr.success('Password reset email sent');
      this.closeModal();
    }
    else{
      this.toastr.error('Password reset email not sent', 'error');
    }
  }
  selectRole(role: string) {
    this.roleSelected = true;
    this.isGymOwner = role === 'owner';
  }
}
