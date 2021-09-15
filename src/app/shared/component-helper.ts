import { ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ComponentHelper {
  public findInvalidFormControls(formGroup: FormGroup) {
    const invalid = [];
    const controls = formGroup.controls;

    for (const name in controls) {
      if (controls[name].invalid) {
        let errors = controls[name].errors;
        invalid.push({name: name, errors: errors});
      }
    }

    return invalid;
  }

  public formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  // private InvalidStringMessage(name: string, error: ValidationErrors) {
  //   const invalidReason: Object = error["errors"];
  //   let errorMessages: string[] = [];
  //   if (invalidReason.hasOwnProperty('maxFileSize') && invalidReason.hasOwnProperty('maxSize')) {
  //     let maxSize = (invalidReason['maxSize']) ? ;
  //     errorMessages.push(name + ' has a maximum file size of ' + this.formatBytes(maxSize));
  //   }
  //  // if (invalidReason.hasnOwnProperty(''))
  // }
}
