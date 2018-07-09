import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { NgbdComponentsSharedModule } from '../shared';
import { NgbdCollapseApi } from './api.component';
import { DEMO_DIRECTIVES } from './demos';
import { NgbdCollapseExamples } from './examples.component';

export * from './api.component';
export * from './examples.component';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [NgbdCollapseExamples, NgbdCollapseApi],
  declarations: [NgbdCollapseExamples, NgbdCollapseApi,  ...DEMO_DIRECTIVES]
})
export class NgbdCollapseModule {}
