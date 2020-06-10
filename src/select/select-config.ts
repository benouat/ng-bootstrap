import {Injectable, TemplateRef} from '@angular/core';

/**
 * Configuration service for the NgbSelect component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the selects used in the application.
 */
@Injectable({providedIn: 'root'})
export class NgbSelectConfig {
  optionTemplate: TemplateRef<any>| null = null;
  selectedOptionTemplate: TemplateRef<any>| null = null;
}
