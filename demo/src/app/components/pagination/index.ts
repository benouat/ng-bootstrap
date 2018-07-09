import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { NgbdComponentsSharedModule } from '../shared';
import { NgbdPaginationApi } from './api.component';
import { DEMO_DIRECTIVES } from './demos';
import { NgbdPaginationExamples } from './examples.component';

export * from './api.component';
export * from './examples.component';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [NgbdPaginationApi, NgbdPaginationExamples],
  declarations: [NgbdPaginationApi, NgbdPaginationExamples, ...DEMO_DIRECTIVES]
})
export class NgbdPaginationModule {}
