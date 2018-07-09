import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { NgbdComponentsSharedModule } from '../shared';
import { NgbdRatingApi } from './api.component';
import { DEMO_DIRECTIVES } from './demos';
import { NgbdRatingExamples } from './examples.component';

export * from './api.component';
export * from './examples.component';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [NgbdRatingApi, NgbdRatingExamples],
  declarations: [NgbdRatingApi, NgbdRatingExamples, ...DEMO_DIRECTIVES]
})
export class NgbdRatingModule {}
