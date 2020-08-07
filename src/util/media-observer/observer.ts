import {isPlatformBrowser, DOCUMENT} from '@angular/common';
import {Inject, PLATFORM_ID, OnDestroy, NgZone, Injectable} from '@angular/core';
import {Observable, Subject, combineLatest} from 'rxjs';
import {startWith, takeUntil, map, tap} from 'rxjs/operators';
import {BOOTSTRAP_BREAKPOINTS} from './breakpoints';

interface MediaQueryListMeta {
  mediaQueryList: MediaQueryList;
  mediaQueryList$: Observable<MediaQueryListEvent>;
}

export interface MediaBreakpointsState {
  matches: boolean;
  breakpoints: {[key: string]: boolean};
}

function flattenQueries(queries: string[]): string[] {
  return queries.map(q => q.split(',')).reduce((flat, a) => flat.concat(a));
}

function notSupported(query: string): Partial<MediaQueryList> {
  return ({matches: false, media: query, addListener: () => {}, removeListener: () => {}});
}

@Injectable({providedIn: 'root'})
class NgbMediaQuery {
  private _isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId) { this._isBrowser = isPlatformBrowser(platformId); }

  matchMedia(query: string): MediaQueryList {
    if (this._isBrowser && window.matchMedia) {
      return window.matchMedia(query);
    } else {
      return notSupported(query) as MediaQueryList;
    }
  }
}

@Injectable({providedIn: 'root'})
export class NgbMediaObserver implements OnDestroy {
  private readonly _destroy$ = new Subject();

  private _queries = new Map<string, MediaQueryListMeta>();

  constructor(private _mediaQuery: NgbMediaQuery, private _zone: NgZone) {}

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  /**
   * Verifies if at least one of the provided media-queries is matching
   * the current viewport
   */
  matches(queries): boolean {
    queries = flattenQueries(Array.isArray(queries) ? queries : [queries]);
    return queries.some(q => this._registerQuery(q).mediaQueryList.matches);
  }

  /**
   * Produces an observable for a set of media-queries that will emit
   * meta information for any changes of the given queries.
   * @param value One or more media-queries to be observed.
   * @returns A stream of matches meta object for the given media-queries.
   */
  observe(queries: string | string[]): Observable<MediaBreakpointsState> {
    queries = flattenQueries(Array.isArray(queries) ? queries : [queries]);
    return combineLatest(queries.map(q => this._registerQuery(q).mediaQueryList$))
        .pipe(
            map((events: MediaQueryListEvent[]): MediaBreakpointsState => events.reduce(
                    (result, event) => {
                      result.matches = result.matches || event.matches;
                      result.breakpoints[event.media] = event.matches;
                      return result;
                    },
                    { matches: false, breakpoints: {} } as MediaBreakpointsState)));
  }

  private _registerQuery(query: string): MediaQueryListMeta {
    if (this._queries.has(query)) {
      return this._queries.get(query) !;
    }

    const queryList: MediaQueryList = this._mediaQuery.matchMedia(query);
    const queryList$ = new Observable<MediaQueryListEvent>(observer => {
                         const handler = (event: MediaQueryListEvent) => this._zone.run(() => observer.next(event));
                         if (queryList.addEventListener) {
                           queryList.addEventListener('change', handler);
                           return () => { queryList.removeEventListener('change', handler); };
                         } else {
                           // tslint:disable-next-line: deprecation
                           queryList.addListener(handler);  // Safari < 14
                           // tslint:disable-next-line: deprecation
                           return () => { queryList.removeListener(handler); };
                         }
                       })
                           .pipe(
                               startWith({ media: query, matches: queryList.matches } as MediaQueryListEvent),
                               takeUntil(this._destroy$));

    const meta: MediaQueryListMeta = {mediaQueryList: queryList, mediaQueryList$: queryList$};
    this._queries.set(query, meta);
    return meta;
  }
}
