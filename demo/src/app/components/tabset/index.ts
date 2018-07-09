import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { NgbdComponentsSharedModule } from '../shared';
import { NgbdTabsApi } from './api.component';
import { DEMO_DIRECTIVES } from './demos';
import { NgbdTabsExamples } from './examples.component';

export * from './api.component';
export * from './examples.component';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [NgbdTabsApi, NgbdTabsExamples],
  declarations: [NgbdTabsApi, NgbdTabsExamples, ...DEMO_DIRECTIVES]
})
export class NgbdTabsModule {}
