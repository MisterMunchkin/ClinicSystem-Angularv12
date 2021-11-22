import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { AngularFireAnalytics } from "@angular/fire/analytics";
import { ToastrHelperService } from "../services/toastr/toastr-helper.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError (error: Error) {
    const analytics = this.injector.get(AngularFireAnalytics);
    const toastr = this.injector.get(ToastrHelperService);

    analytics.logEvent(`error: ${error.name}`, {message: error.message, stack: error.stack});
    toastr.errorToastr(error.message, error.name);
    throw error;
  }
}
