import {Component} from '@angular/core';
import {Subject} from 'rxjs';

@Component({selector: 'ngbd-loader-timeout-treshold', templateUrl: './loader-timeout-treshold.html'})
export class NgbdLoaderTimeoutTreshold {
  private _start$ = new Subject<any>();
  private _end$ = new Subject<any>();

  get start$() { return this._start$.asObservable(); }
  get end$() { return this._end$.asObservable(); }

  start() {
    this._start$.next('start');
    setTimeout(() => this._end$.next('stop'), 10000);
  }
}
