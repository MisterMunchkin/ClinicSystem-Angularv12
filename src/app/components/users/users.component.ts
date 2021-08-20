import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { UsersDataSource } from './users-datasource';
import { UserDocument } from '../../shared/models/user';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UserDocument>;
  dataSource: UsersDataSource;
  isLoading$: boolean = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['photo', 'email', 'displayName', 'role'];

  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;

    this.isLoading$ = true
    this.userService.getUserCollections()
    .subscribe(
    data => {
      this.table.dataSource = new UsersDataSource(data);
      this.isLoading$ = false;
    },
    error => {
      this.isLoading$ = false;
      console.log(error);
    });
  }

  getRole(isAdmin: boolean, isDoctor: boolean): string {
    let role = '';

    if (isAdmin && isDoctor) {
      role = 'Admin, Doctor';
    } else if (isAdmin) {
      role = 'Admin';
    } else if (isDoctor) {
      role = 'Doctor';
    } else {
      role = 'No Role';
    }

    return role;
  }
}
