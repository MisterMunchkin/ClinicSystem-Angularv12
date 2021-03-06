import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UsersDataSource } from './users-datasource';
import { UserDocument } from '../../shared/models/user';
import { UserService } from '../../shared/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './user-form-dialog/user-form-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UserDocument>;
  dataSource: MatTableDataSource<UserDocument>;
  isLoading$: boolean = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['photo', 'email', 'displayName', 'role', 'actions'];

  constructor(private userService: UserService,
    private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;

    this.isLoading$ = true
    this.userService.getUserCollections()
    .subscribe(
    data => {
      this.dataSource = new MatTableDataSource(data);
      this.table.dataSource = this.dataSource;
      this.isLoading$ = false;
    },
    error => {
      this.isLoading$ = false;
      console.log(error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  addNewUser() {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {});

    dialogRef.afterClosed()
    .subscribe(result => {
      if (result) {
        //save to user collection and send email for invite.
        console.log(result);
      }
    })
  }

  editUser(row: UserDocument) {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      data: row
    });

    dialogRef.afterClosed()
    .subscribe(result => {
      if (result) {
        console.log(result);
      }
    })
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
