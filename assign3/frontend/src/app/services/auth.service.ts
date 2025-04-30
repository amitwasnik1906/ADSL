import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000'; // API domain

  http = inject(HttpClient);
  router = inject(Router)

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  logout() {
    localStorage.removeItem('assignment3token');
    this.router.navigate(['/login']);
  }

  getUser() {
    return this.http.get(`${this.apiUrl}/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('assignment3token')}`
      }
    });
  }

  isLoggedIn() {
    return !!localStorage.getItem('assignment3token');
  }

  getToken() {
    return localStorage.getItem('assignment3token');
  }


}
