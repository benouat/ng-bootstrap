import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { NgbdComponentsSharedModule } from '../shared';
import { NgbdTooltipApi } from './api.component';
import { DEMO_DIRECTIVES } from './demos';
import { NgbdTooltipExamples } from './examples.component';

export * from './api.component';
export * from './examples.component';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [NgbdTooltipApi, NgbdTooltipExamples],
  declarations: [NgbdTooltipApi, NgbdTooltipExamples, ...DEMO_DIRECTIVES]
})
export class NgbdTooltipModule {}
