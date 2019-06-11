import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

/**
 * A configuration service for the [NgbLoader](#/components/loader/api#NgbLoader) component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all loaders used in the application.
 */
@Injectable({providedIn: 'root'})
export class NgbLoaderConfig {
  /** Color of the progressbar.*/
  color = '#0273d4';

  /** Amount of millisecond after which the loader should be displayed in fullscreen. */
  fullscreenTreshold = 3000;

  /** Foreach loading state at initialisation, a random number will be picked between 0 and this value. */
  initialRandomRange = 30;

  /** Observable to listen to to start the progressbar. */
  start$: Observable<any>;

  /** Observable to listen to to end the progressbar. */
  end$: Observable<any>;

  /** A11y fullscreen loading message (Will only be used by screen readers technology). */
  loadingMessage = 'Page is loading...';
}
