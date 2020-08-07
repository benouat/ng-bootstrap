import {
  Directive,
  Input,
  ViewContainerRef,
  TemplateRef,
  Inject,
} from '@angular/core';
import {NgbMediaObserver} from './observer';
import {Subject} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {BOOTSTRAP_BREAKPOINTS} from './breakpoints';

@Directive({selector: '[ngbIfMedia]'})
export class NgbMediaDirective {
  private readonly _query = new Subject<string>();

  @Input()
  set ngbIfMedia(value: string) {
    this._query.next(this._bootstrapBreakPoints[value] || value);
  }

  constructor(
      @Inject(BOOTSTRAP_BREAKPOINTS) private _bootstrapBreakPoints, private _viewContainerRef: ViewContainerRef,
      mediaObserver: NgbMediaObserver, _template: TemplateRef<any>) {
    this._query.pipe(switchMap(query => mediaObserver.observe(query))).subscribe(({matches}) => {
      if (matches) {
        this._viewContainerRef.createEmbeddedView(_template);
      } else {
        this._viewContainerRef.clear();
      }
    });
  }
}
