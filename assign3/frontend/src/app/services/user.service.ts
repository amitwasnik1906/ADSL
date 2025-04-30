import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(`${this.apiUrl}/users`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('assignment3token')}`
      }
    });
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('assignment3token')}`
      }
    });
  }
}
