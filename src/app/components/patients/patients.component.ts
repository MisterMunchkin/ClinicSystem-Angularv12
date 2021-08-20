import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MonthsDB } from 'src/app/shared/data/months';
import { Birthdate, Patient } from 'src/app/shared/models/patient';
import { PatientService } from 'src/app/shared/services/patient/patient.service';
import { PatientsDataSource } from './patients-datasource';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<Patient>;
  dataSource: PatientsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'gender', 'birthdate', 'civilStatus'];
  //displayedColumns = ['id', 'name'];
  isLoading$: boolean;

  constructor(private patientService: PatientService) {}

  ngAfterViewInit(): void {
    this.isLoading$ = true;
    this.patientService.getPatientCollections()
    .subscribe(data => {
      console.log(data);
      this.table.dataSource = new PatientsDataSource(data);
      this.isLoading$ = false;
    }, error => {
      this.isLoading$ = false;
      console.log(error);
    })
  }

  getGenderString(gender: string): string {
    if (gender === 'M') {
      return 'Male';
    } else if (gender === 'F') {
      return 'Female';
    } else {
      return 'Others';
    }
  }

  getBirthdateString(birthdate: Birthdate): string {
    const monthName = MonthsDB.monthNames[birthdate.month - 1];

    return monthName + ' ' + birthdate.day + ', ' + birthdate.year;
  }
}
