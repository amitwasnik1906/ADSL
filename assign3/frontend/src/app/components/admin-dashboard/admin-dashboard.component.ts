import { Component } from '@angular/core';
import { UserListComponent } from "../user-list/user-list.component";
import { ReportGeneratorComponent } from "../report-generator/report-generator.component";

@Component({
  selector: 'app-admin-dashboard',
  imports: [UserListComponent, ReportGeneratorComponent, UserListComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
