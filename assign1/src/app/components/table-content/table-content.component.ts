import { Component, inject, input, signal, SimpleChanges } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-table-content',
  imports: [],
  templateUrl: './table-content.component.html',
  styleUrl: './table-content.component.scss',
})

export class TableContentComponent {
  tableName = input.required<string>()
  crudOperationsService = inject(CrudService)
  tableContent = signal<Array<any>>([])

  constructor() {
    console.log('app-table-content constructor called');
  }

  handleDelete(table : string,id: number) : void{
    console.log("delete clicked");
    this.crudOperationsService.deleteRecord(table, id)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        throw err;
      })
    )
    .subscribe((res) => {
      
    })
  }

  ngOnInit(changes: SimpleChanges): void {

    this.crudOperationsService.getDataFromTable(this.tableName())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((res) => {
        this.tableContent.set(res)

        console.log(this.tableContent());
      })

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableName']) {
      console.log('tableName changed:', changes['tableName'].currentValue);
      this.crudOperationsService.getDataFromTable(this.tableName())
        .pipe(
          catchError((err: any) => {
            console.log(err);
            throw err;
          })
        )
        .subscribe((res) => {
          this.tableContent.set(res)

          console.log(this.tableContent());
        })
    }

    
  }
}
