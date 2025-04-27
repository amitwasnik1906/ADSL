import { Component, inject, OnInit, output, signal } from '@angular/core';
import { catchError } from 'rxjs';
import { CrudService } from '../../services/crud.service';
import { TableContentComponent } from '../table-content/table-content.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tables',
  imports: [TableContentComponent, FormsModule,],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss'
})
export class TablesComponent {
  tables = signal<Array<any>>([]);
  crudOperationsService = inject(CrudService)
  toggleTable = signal<string>("students")
  studentName = signal('')
  studentAge = signal(0)
  studentDepartment = signal('')
  courseName = signal('')
  courseCredits = signal(0)

  getTables() : void {
    this.crudOperationsService.getTables()
      .pipe(
        catchError((err: any) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((res) => {
        this.tables.set(res)
      })
  }

  ngOnInit(): void {
    this.getTables()
  }

  clickHandler = (table: string) => {
    this.toggleTable.set(table)
    console.log(this.toggleTable());
  }

  onSubmit = () => {
    if (this.toggleTable() == "students") {
      console.log(this.studentName(), this.studentAge(), this.studentDepartment());
      this.crudOperationsService.createRecord("students", { Name: this.studentName() , Age: this.studentAge(), Department: this.studentDepartment() })
        .pipe(
          catchError((err: any) => {
            console.log(err);
            throw err;
          })
        )
        .subscribe((res) => {
          console.log(res);
          this.getTables()
        })
    }
    else {
      console.log(this.courseName(), this.courseCredits());
      this.crudOperationsService.createRecord("courses", {CourseName: this.courseName(), Credits: this.courseCredits() })
        .pipe(
          catchError((err: any) => {
            console.log(err);
            throw err;
          })
        )
        .subscribe((res) => {
          console.log(res);
          this.getTables()
        })
    }
  }

}
