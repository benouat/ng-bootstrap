import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { NgbdComponentsSharedModule } from '../shared';
import { NgbdAccordionApi } from './api.component';
import { DEMO_DIRECTIVES } from './demos';
import { NgbdAccordionExamples } from './examples.component';

export * from './api.component';
export * from './examples.component';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [],
  declarations: [NgbdAccordionExamples, NgbdAccordionApi, ...DEMO_DIRECTIVES],
  entryComponents: [NgbdAccordionExamples, NgbdAccordionApi]
})
export class NgbdAccordionModule {}
