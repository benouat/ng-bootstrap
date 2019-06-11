import {Component} from '@angular/core';
import {Subject} from 'rxjs';

@Component({selector: 'ngbd-loader-custom-loader', templateUrl: './loader-custom-color.html'})
export class NgbdLoaderCustomColor {
  private _start$ = new Subject<any>();
  private _end$ = new Subject<any>();

  randomColor: string;

  get start$() { return this._start$.asObservable(); }
  get end$() { return this._end$.asObservable(); }

  start() {
    // tslint:disable-next-line
    this.randomColor = '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
    this._start$.next('start');
    setTimeout(() => this._end$.next('stop'), 2000);
  }
}
