import { UserClinic } from './../../shared/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clinic-onboarding',
  templateUrl: './clinic-onboarding.component.html',
  styleUrls: ['./clinic-onboarding.component.css']
})
export class ClinicOnboardingComponent implements OnInit {
  clinicForm: FormGroup;
  clinicData: UserClinic = {
    id: '',
    name: '',
    address: ''
  }

  constructor() { }

  ngOnInit(): void {
    this.clinicForm = new FormGroup({
      name: new FormControl(this.clinicData.name, [Validators.required]),
      address: new FormControl(this.clinicData.address)
    })
  }

  onSubmit() {
    if (this.clinicForm.valid) {
      //should insert to clinic collection and also add the clinic to the user clinic array
    }
  }
}
