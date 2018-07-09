import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { NgbdComponentsSharedModule } from '../shared';
import { NgbdCarouselApi } from './api.component';
import { DEMO_DIRECTIVES } from './demos';
import { NgbdCarouselExamples } from './examples.component';

export * from './api.component';
export * from './examples.component';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [NgbdCarouselExamples, NgbdCarouselApi],
  declarations: [NgbdCarouselExamples, NgbdCarouselApi, ...DEMO_DIRECTIVES]
})
export class NgbdCarouselModule {}
