import {Component} from '@angular/core';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({selector: 'ngbd-timepicker-directives', templateUrl: './timepicker-directives.html'})
export class NgbdTimepickerDirectives {
  time: NgbTimeStruct = {hour: 13, minute: 30};
  meridian = true;
  seconds = false;

  minuteStep = 1;

  toggleMeridian() { this.meridian = !this.meridian; }
  toggleSeconds() {
    if (this.seconds = !this.seconds) {
      this.time = {...this.time, second: 0};
    } else {
      this.time = {hour: this.time.hour, minute: this.time.minute};
    }
  }
}
