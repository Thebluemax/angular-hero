import {Injectable, Injector} from "@angular/core";
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from "@angular/common/http";

import {Observable, map, pipe, catchError, throwError} from "rxjs";
import {SpinnerService} from "../services/spinner.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  spinnerService : SpinnerService;
  constructor(private injector: Injector, private snackbar:MatSnackBar) {}

  intercept(request : HttpRequest<unknown>, next : HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService = this.injector.get(SpinnerService);
    this.spinnerService.setStatus(true);

    return next.handle(request).pipe(
      map((event : HttpEvent<any>) => {
      if(event.type != 0){

        this.spinnerService.setStatus(false);
      }
      return event;
    }),
    catchError ( err => {
      this.spinnerService.setStatus(false);
      console.error(err);
      this.snackbar.open(err.statusText, 'OK')
      return throwError(err);
    })
    );
    
  }
}
