export * from './api.component';
export * from './examples.component';

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbdSharedModule} from '../../shared';
import {NgbdComponentsSharedModule} from '../shared';
import {NgbdTimepickerApi} from './api.component';
import {NgbdTimepickerExamples} from './examples.component';
import {DEMO_DIRECTIVES} from './demos';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [NgbdTimepickerApi, NgbdTimepickerExamples],
  declarations: [NgbdTimepickerApi, NgbdTimepickerExamples, ...DEMO_DIRECTIVES]
})
export class NgbdTimepickerModule {}
