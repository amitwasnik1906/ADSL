import { Component, input } from '@angular/core';

@Component({
  selector: 'app-instructor-dashboard',
  imports: [],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.scss'
})
export class InstructorDashboardComponent {
  userData = input.required<any>()

  
}
