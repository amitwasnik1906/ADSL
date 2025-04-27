import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  private apiUrl = 'http://localhost:3000'; // API domain

  http = inject(HttpClient);

  // Method to fetch available tables
  getTables(): Observable<any> {
    const data = this.http.get<any>(`${this.apiUrl}/tables`);
    return data;
  }

  // Method to fetch data from a specific table
  getDataFromTable(table: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data/${table}`);
  }

  // Method to create a new record in a specific table
  createRecord(table: string, record: {}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/data/${table}`, record);
  }

  // Method to update a record in a specific table
  updateRecord(table: string, id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/data/${table}`, { id, data });
  }

  // Method to delete a record from a specific table
  deleteRecord(table: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/data/${table}/${id}`);
  }
}
