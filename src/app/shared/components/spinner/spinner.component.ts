import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  
  open:boolean;
  constructor(
    private spinnerService: SpinnerService
  ) {  console.log('created')}

  ngOnInit(): void {
    this.spinnerService.status
    .subscribe( status => {
      this.open = status;
    })
  }

}
