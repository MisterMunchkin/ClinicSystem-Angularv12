import { PatientHistory } from './../../shared/models/patient';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements OnInit {
  @Input() patientHistoryCollection: PatientHistory[];

  constructor() { }

  ngOnInit(): void {
    //console.log(this.patientHistory.dateOfVisit.toDateString());
  }

}
