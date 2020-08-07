import {Component, Inject, OnDestroy} from '@angular/core';
import {BOOTSTRAP_BREAKPOINTS, NgbMediaObserver, MediaBreakpointsState} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Snippet} from '../../shared/code/snippet';

@Component({templateUrl: './media-queries.component.html'})
export class MediaObserverPage implements OnDestroy {
  private readonly _destroy$ = new Subject();

  basic = Snippet({
    lang: 'typescript',
    code: `
    @Component({ ... })
    export class MyComponent {
      constructor(mediaObserver: NgbMediaObserver) {
        // You can verify one time
        const isMatching = mediaObserver.matches("(min-width: 576px)");

        // You can react to any changes
        mediaObserver.observe("(min-width: 576px)").subscribe(
          ({matches}) => { // Do what you want with matches }
        )
      }
    }
    `
  });

  bstoken = Snippet({
    lang: 'typescript',
    code: `
    import { NgbMediaObserver, BOOTSTRAP_BREAKPOINTS } from "@ng-bootstrap/ng-bootstrap";

    @Component({...})
    export class MyComponent {
      constructor(
        mediaObserver: NgbMediaObserver,
        @Inject(BOOTSTRAP_BREAKPOINTS) bsBreakpoints) {
          // You can access predefined shortcuts: bsBreakpoints.xs, bsBreakpoints.lg ...
          mediaObserver.observe(bsBreakpoints.sm).subscribe(...)
      }
    }`
  });

  bstokenTemplate = Snippet({
    lang: 'html',
    code: `
    <p *ngIfMedia="'xs'">Only appears on small devices.</p>
    <p *ngIfMedia="'xl'">Only appears on very large devices.</p>
    `
  });



  bsBreakPointsName: string[];
  bsBreakpointsActive: {[key: string]: boolean};

  constructor(@Inject(BOOTSTRAP_BREAKPOINTS) public bsBreakPoints, mediaObserver: NgbMediaObserver) {
    this.bsBreakPointsName = Object.keys(bsBreakPoints);

    mediaObserver.observe(Object.values(bsBreakPoints)).pipe(takeUntil(this._destroy$)).subscribe(event => {
      this.bsBreakpointsActive = event.breakpoints;
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
