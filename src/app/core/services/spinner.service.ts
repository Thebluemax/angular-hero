import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private statusFlag:boolean;

  private launchSpinner = new BehaviorSubject(false);
  public status  = this.launchSpinner.asObservable();

  constructor() { }

  public setStatus(status: boolean) {
    this.statusFlag = status;
    this.processStatus();
  }

  private getText():boolean {
    return this.statusFlag;
  }

  processStatus(){
    this.launchSpinner.next(this.statusFlag);
  }
}
