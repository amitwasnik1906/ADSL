import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: [''],
      course: ['', Validators.required],
      rollNumber: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
      this.http.post('http://localhost:3000/student', this.studentForm.value)
        .subscribe(response => {
          console.log('Response:', response);
          alert('Student data submitted successfully!');
        }, error => {
          console.error('Error:', error);
          alert('Error submitting student data.');
        });
    } else {
      alert('Please fill all required fields correctly.');
    }
  }
}
