import {Injectable, Injector} from "@angular/core";
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from "@angular/common/http";

import {Observable, map, pipe} from "rxjs";
import {SpinnerService} from "../services/spinner.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  spinnerService : SpinnerService;
  constructor(private injector: Injector) {}

  intercept(request : HttpRequest<unknown>, next : HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService = this.injector.get(SpinnerService);
    this.spinnerService.setStatus(true);

    return next.handle(request).pipe(map((event : HttpEvent<any>) => {
      if(event.type != 0){
        console.log(event)

        this.spinnerService.setStatus(false);
      }
      return event;
    }));
  }
}
