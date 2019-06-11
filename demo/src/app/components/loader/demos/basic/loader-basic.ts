import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({selector: 'ngbd-loader-basic', templateUrl: './loader-basic.html'})
export class NgbdLoaderBasic {
  private _start$ = new Subject<any>();
  private _end$ = new Subject<any>();

  position: 'absolute' | null = 'absolute';
  duration: number;
  value = 0;

  get start$() { return this._start$.asObservable(); }
  get end$() { return this._end$.asObservable(); }

  start(local = false) {
    this.position = local ? 'absolute' : null;
    this.duration = Math.floor(Math.random() * 2000 + 200);
    this._start$.next('start');
    setTimeout(() => this._end$.next('stop'), this.duration);
  }

  short() {
    this.position = 'absolute';
    this._start$.next('start');
    setTimeout(() => this._end$.next('stop'), 35);
  }
}
