import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { catchError } from 'rxjs';
import { AdminDashboardComponent } from "../../components/admin-dashboard/admin-dashboard.component";
import { StudentDashboardComponent } from "../../components/student-dashboard/student-dashboard.component";
import { InstructorDashboardComponent } from '../../components/instructor-dashboard/instructor-dashboard.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, RouterLink, AdminDashboardComponent, StudentDashboardComponent, InstructorDashboardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  authService = inject(AuthService)
  userdata = signal<any>(null)
  role = signal("")

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.getUser()
        .pipe(
          catchError((err: any) => {
            console.log(err);
            throw err;
          })
        )
        .subscribe((res: any) => {
          this.userdata.set(res[0]);
          this.role.set(res[0].role)
          console.log(this.userdata());
        })
    }
  }
}
