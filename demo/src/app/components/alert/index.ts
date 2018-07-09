import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { NgbdComponentsSharedModule } from '../shared';
import { NgbdAlertApi } from './api.component';
import { DEMO_DIRECTIVES } from './demos';
import { NgbdAlertExamples } from './examples.component';

export * from './examples.component';
export * from './api.component';


@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [NgbdAlertExamples, NgbdAlertApi],
  declarations: [NgbdAlertExamples, NgbdAlertApi, ...DEMO_DIRECTIVES]
})
export class NgbdAlertModule {}
