import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users = signal<Array<any>>([]);
  userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getAllUsers()
      .pipe(
        catchError((err: any) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((res: any) => {
        this.users.set(res);
        console.log(this.users());
      });
  }

  handleDelete(id: number): void {
    console.log("clicked");

    this.userService.deleteUser(id)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe(() => {
        // Remove deleted user from signal array
        this.users.set(this.users().filter(user => user.ID !== id));
      });
  }

}
