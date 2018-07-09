import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { NgbdComponentsSharedModule } from '../shared';
import { NgbdButtonsApi } from './api.component';
import { DEMO_DIRECTIVES } from './demos';
import { NgbdButtonsExamples } from './examples.component';

export * from './api.component';
export * from './examples.component';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [NgbdButtonsExamples, NgbdButtonsApi],
  declarations: [NgbdButtonsExamples, NgbdButtonsApi,  ...DEMO_DIRECTIVES]
})
export class NgbdButtonsModule {}
