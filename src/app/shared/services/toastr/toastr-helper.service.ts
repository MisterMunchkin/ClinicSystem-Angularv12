import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

//Created so we do not need to keep writing the override options that we
//added for our app. Also so we can set default messages and titles for generic
//toastrs
@Injectable({
  providedIn: 'root'
})
export class ToastrHelperService {

  private overrideOptions: Partial<IndividualConfig> = {
    tapToDismiss: true,
    easing: 'ease-in'
  };

  constructor(private toastr: ToastrService) { }

  successToastr(message: string, title: string, overrideOptions: Partial<IndividualConfig> = this.overrideOptions) {
    this.toastr.success(message, title, overrideOptions);
  }

  errorToastr(message: string = 'Something went wrong', title: string = 'Error', overrideOptions: Partial<IndividualConfig> = this.overrideOptions) {
    this.toastr.error(message, title, overrideOptions);
  }
}
