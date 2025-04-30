import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService)
  router = inject(Router)

  email = signal("")
  password = signal("")

  onSubmit(){
    this.authService.login({email: this.email(), password: this.password()})
    .pipe(
      catchError((err: any) => {
        alert(err.error.message)
        console.log(err);
        throw err;
      })
    )
    .subscribe((res) => {
      localStorage.setItem("assignment3token", (res as {token: string}).token)
      alert("Login Successful")
      this.router.navigate(['/'])
    })
  }

}
