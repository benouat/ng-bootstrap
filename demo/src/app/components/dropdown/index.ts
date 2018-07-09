import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { NgbdComponentsSharedModule } from '../shared';
import { NgbdDropdownApi } from './api.component';
import { DEMO_DIRECTIVES } from './demos';
import { NgbdDropdownExamples } from './examples.component';


export * from './api.component';
export * from './examples.component';

@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  exports: [NgbdDropdownExamples, NgbdDropdownApi],
  declarations: [NgbdDropdownExamples, NgbdDropdownApi, ...DEMO_DIRECTIVES]
})
export class NgbdDropdownModule {}
