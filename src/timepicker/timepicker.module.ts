import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbTimepicker} from './timepicker';
import {NgbTimepickerDirective} from './timepicker-input';

export {NgbTimepicker} from './timepicker';
export {NgbTimepickerConfig} from './timepicker-config';
export {NgbTimeStruct} from './ngb-time-struct';
export {NgbTimeAdapter} from './ngb-time-adapter';
export {NgbTimepickerI18n} from './timepicker-i18n';

@NgModule({
  declarations: [NgbTimepicker, NgbTimepickerDirective],
  exports: [NgbTimepicker, NgbTimepickerDirective],
  imports: [CommonModule]
})
export class NgbTimepickerModule {
}
