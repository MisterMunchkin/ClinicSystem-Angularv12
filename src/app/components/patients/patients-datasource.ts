import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, ReplaySubject } from 'rxjs';
import { Patient } from 'src/app/shared/models/patient';


/**
 * Data source for the Patients view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PatientsDataSource extends DataSource<Patient> {
  private data: ReplaySubject<Patient[]> = new ReplaySubject<Patient[]>();
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(initialData: Patient[]) {
    super();
    this.setData(initialData);
  }

  setData(data: Patient[]): void {
    this.data.next(data);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Patient[]> {
    return this.data;
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

}
