import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { NgbdComponentsSharedModule } from '../shared';
import { NgbdDatepickerApi } from './api.component';
import { DEMO_DIRECTIVES } from './demos';
import { NgbdDatepickerExamples } from './examples.component';
import { NgbdDatepickerOverview, NgbdDatepickerOverviewDemoComponent } from './overview';

export * from './examples.component';
export * from './api.component';
export * from './overview';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [NgbdDatepickerExamples, NgbdDatepickerApi],
  declarations: [
    NgbdDatepickerExamples,
    NgbdDatepickerApi,
    ...DEMO_DIRECTIVES,
    NgbdDatepickerOverview,
    NgbdDatepickerOverviewDemoComponent
  ]
})
export class NgbdDatepickerModule {}
