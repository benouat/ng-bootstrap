import {DOCUMENT} from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {interval, Observable, timer} from 'rxjs';
import {delay, switchMap, takeUntil, tap} from 'rxjs/operators';

import {NgbLoaderConfig} from './loader-config';



/**
 * A directive to provide custom content for the fullscreen mode of [NgbLoader](#/components/loader/api#NgbLoader).
 */
@Directive({selector: 'ng-template[ngbLoaderContent]'})
export class NgbLoaderContent {
}

/**
 * Fullscreen application loader heavily inspired from Youtube and Github top screen progressbar loader.
 *
 * API is Observable based for an easy Router integration using
 * [`router.events`](https://angular.io/guide/observables-in-angular#router)
 */
@Component({
  selector: 'ngb-loader',
  exportAs: 'ngbLoader',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="ngb-loader-progressbar"
      [style.width.%]="value"
      [class.hidden]="hidden"
    ></div>
    <ng-template #defaultContent>
      <div class="spinner-border" role="status" aria-live="assertive">
        <span class="sr-only" i18n="@@ngb.app-loader.loading.message">{{loadingMessage}}</span>
      </div>
    </ng-template>
    <div class="ngb-loader-fullscreen" *ngIf="fullScreen">
      <ng-template [ngTemplateOutlet]="contentTpl || defaultContent"></ng-template>
    </div>
  `,
  styleUrls: [`./loader.scss`]
})
export class NgbLoader implements OnInit {
  fullScreen = false;

  /* Hide the progressbar to transition back from 100% to 0% */
  hidden = false;

  /* Value of the progresbar */
  value = 0;

  /** Color of the progressbar. (default: #0273d4) */
  @HostBinding('style.color') @Input() color: string;

  /** Amount of millisecond after which the loader should be displayed in fullscreen. */
  @Input() fullscreenTreshold: number;

  /** Fullscreen loading message. */
  @Input() fullscreenLoadingMessage: string;

  /**
   * When the loader starts, each time `start$` observable emits,
   * an initial random value for the progressbar is picked between 0 and this value.
   * (default: 3000ms)
   */
  @Input() initialRandomRange: number;

  /**
   * Observable used to trigger the start of the loading.
   * When emitting, progressbar will start to randomly increment toward 100%.
   */
  @Input() start$: Observable<any>;

  /**
   * Observable used to trigger the end of the loading.
   * When emitting, it forces the progressbar to reach 100%.
   */
  @Input() end$: Observable<any>;

  /**
   * Event emitted when the progressbar value changes.
   * Event payload corresponds to progress value in percentage.
   */
  @Output('value') valueChange = new EventEmitter<number>();

  @ContentChild(NgbLoaderContent, {read: TemplateRef, static: true}) contentTpl: TemplateRef<any>;

  constructor(config: NgbLoaderConfig, @Inject(DOCUMENT) private _document: any) {
    this.color = config.color;
    this.fullscreenTreshold = config.fullscreenTreshold;
    this.initialRandomRange = config.initialRandomRange;
    this.fullscreenLoadingMessage = config.loadingMessage;

    if (config.start$) {
      this.start$ = config.start$;
    }
    if (config.end$) {
      this.end$ = config.end$;
    }
  }

  ngOnInit() {
    if (!this.start$ || !this.end$) {
      console.warn(`<ngb-app-loader> 'start$' and 'end$' inputs are mandatory. Observables must be provided.`);
      return;
    }

    const timer$ = timer(this.fullscreenTreshold);
    this.start$
        .pipe(switchMap(_ => {
          // For each loading cycle, we start a new interval
          interval(50).pipe(takeUntil(this.end$)).subscribe(count => {
            if (count === 0) {
              // First value, random pick between 0 and initialRandomRange
              this.value = Math.floor(Math.random() * this.initialRandomRange);
            } else {
              // Next iteration, random increment to progressively reach 100%
              this.value += Math.floor(Math.random() * ((100 - this.value) / 10));
            }
            this.valueChange.next(this.value);
          });
          return timer$.pipe(takeUntil(this.end$));
        }))
        .subscribe(() => {
          // When we get there, fullscreen timeout has fired.
          (this._document.body as HTMLElement).classList.add('ngb-loader-fullscreen-active');
          this.fullScreen = true;
        });


    this.end$
        .pipe(
            tap(() => {
              if (this.value > 0) {
                this.valueChange.next(this.value = 100);
              }
              // let's deactivate fullscreen mode
              (this._document.body as HTMLElement).classList.remove('ngb-loader-fullscreen-active');
              this.fullScreen = false;
            }),
            /* We force a double 500ms delay for user to actually see the progressbar at 100%, otherwise it would be too
               fast. */
            delay(500), tap(() => { this.hidden = true; }), delay(500),
            tap(() => { this.valueChange.next(this.value = 0); }),
            /* waiting a little bit more for the end of opacity animation when 100% → 0%. */
            delay(250))
        .subscribe(() => { this.hidden = false; });
  }
}
