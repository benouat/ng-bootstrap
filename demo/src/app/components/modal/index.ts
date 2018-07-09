import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { NgbdComponentsSharedModule } from '../shared';
import { NgbdModalApi } from './api.component';
import { DEMO_DIRECTIVES, NgbdModalContent } from './demos';
import { NgbdModalExamples } from './examples.component';

export * from './api.component';
export * from './examples.component';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [NgbdModalApi, NgbdModalExamples],
  entryComponents: [NgbdModalContent],
  declarations: [NgbdModalApi, NgbdModalExamples, NgbdModalContent, ...DEMO_DIRECTIVES]
})
export class NgbdModalModule {}
