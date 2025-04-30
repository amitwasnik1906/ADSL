import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-register-page',
  imports: [FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  authService = inject(AuthService)

  name = signal("");
  email = signal("");
  password = signal("");
  confirmPassword = signal("");
  role = signal("user");

  onSubmit(){
    if (this.password() !== this.confirmPassword()) {
      console.error('Passwords do not match');
      alert('Passwords do not match');
      return;
    }

    this.authService.register({
      name: this.name(),
      email: this.email(), 
      password: this.password(),
      role: this.role()
    })
    .pipe(
      catchError((err: any) => {
        alert(err.error.message)
        console.error('Registration error:', err);
        throw err;
      })
    )
    .subscribe((res) => {
      alert("Registration successful")
      console.log('Registration successful:', res);
      window.location.href = '/login';
    });
  }

}
