import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {NgbOptionTemplate, NgbSelectBase, NgbSelectedOptionTemplate} from './base-select';
import {NgbSelect} from './select';
import {NgbSelectConfig} from './select-config';
import {NgbSelectMultiple} from './select-multiple';
import {NgbSelectOption} from './select-option';

export {
  NgbSelectBase,
} from './base-select';
export {NgbSelect} from './select';
export {NgbSelectMultiple} from './select-multiple';
export {NgbSelectOption} from './select-option';
export {NgbSelectConfig} from './select-config';

@NgModule({
  declarations:
      [NgbOptionTemplate, NgbSelectedOptionTemplate, NgbSelectBase, NgbSelect, NgbSelectMultiple, NgbSelectOption],
  imports: [CommonModule],
  exports:
      [NgbOptionTemplate, NgbSelectedOptionTemplate, NgbSelectBase, NgbSelect, NgbSelectMultiple, NgbSelectOption]
})
export class NgbSelectModule {
}
