import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const validatebirthMonth : ValidatorFn =
(control: AbstractControl): ValidationErrors | null => {
  const birthMonth = control.get('birthMonth');
  if (birthMonth && birthMonth.value) {
    const forbidden = (birthMonth.value > 12 || birthMonth.value < 1);
    return forbidden ? {forbiddenMonth: {value: birthMonth.value}} : null;
  }
  return null;
}

export const validatebirthDay : ValidatorFn =
(control: AbstractControl): ValidationErrors | null => {
  const month = control.get('birthMonth');
  const year = control.get('birthYear');
  const day = control.get('birthDay');
  if ((month && year && day) && (month.value && year.value && day.value)) {
    const maxDaysInMonth = daysInMonth(month.value, year.value);
    const forbidden = (day.value > maxDaysInMonth || day.value < 1);
    return forbidden ? {forbiddenDay: {value: day.value}} : null;
  }
  return null;
}

export const validatebirthYear : ValidatorFn =
(control: AbstractControl): ValidationErrors | null => {
  const currentYear = new Date().getFullYear();
  const birthYear = control.get('birthYear');
  if (birthYear && birthYear.value) {
    const forbidden = (birthYear.value > currentYear || birthYear.value < 1880);
    return forbidden ? {forbiddenYear: {value: birthYear.value}} : null;
  }
  return null;
}

function daysInMonth(month: number, year: number) { //m is 0 index: 0-11
  switch (month) {
    case 1 : //February
      return (year % 4 === 0 && year % 100) || year % 400 === 0 ? 29 : 28;
    case 8 : case 3 : case 5 : case 10 :
      return 30;
    default :
      return 31
  }
}
