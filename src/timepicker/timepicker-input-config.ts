import {Injectable} from '@angular/core';
/**
 * A configuration service for the [`NgbTimepickerDirective`](#/components/timepicker/api#NgbTimepickerDirective)
 * directive.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the timepickers used in the application.
 */
@Injectable({providedIn: 'root'})
export class NgbTimepickerInputConfig {
  disabled = false;
  meridian = false;
  hourStep = 1;
  minuteStep = 1;
  secondStep = 1;
}
