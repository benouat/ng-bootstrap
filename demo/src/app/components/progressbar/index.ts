import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { NgbdComponentsSharedModule } from '../shared';
import { NgbdProgressbarApi } from './api.component';
import { DEMO_DIRECTIVES } from './demos';
import { NgbdProgressbarExamples } from './examples.component';

export * from './api.component';
export * from './examples.component';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [NgbdProgressbarApi, NgbdProgressbarExamples],
  declarations: [NgbdProgressbarApi, NgbdProgressbarExamples, ...DEMO_DIRECTIVES]
})
export class NgbdProgressbarModule {}
