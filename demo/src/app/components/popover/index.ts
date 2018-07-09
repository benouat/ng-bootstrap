import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { NgbdComponentsSharedModule } from '../shared';
import { NgbdPopoverApi } from './api.component';
import { DEMO_DIRECTIVES } from './demos';
import { NgbdPopoverExamples } from './examples.component';

export * from './examples.component';
export * from './api.component';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [NgbdPopoverApi, NgbdPopoverExamples],
  declarations: [NgbdPopoverApi, NgbdPopoverExamples, ...DEMO_DIRECTIVES]
})
export class NgbdPopoverModule {}
