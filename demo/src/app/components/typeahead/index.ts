import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { NgbdComponentsSharedModule } from '../shared';
import { NgbdTypeaheadApi } from './api.component';
import { DEMO_DIRECTIVES } from './demos';
import { NgbdTypeaheadExamples } from './examples.component';

export * from './api.component';
export * from './examples.component';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [NgbdTypeaheadApi, NgbdTypeaheadExamples],
  declarations: [NgbdTypeaheadApi, NgbdTypeaheadExamples, ...DEMO_DIRECTIVES]
})
export class NgbdTypeaheadModule {}
