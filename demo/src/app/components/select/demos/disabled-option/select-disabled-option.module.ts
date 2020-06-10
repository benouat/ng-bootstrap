import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgbdSelectDisabledOption} from './select-disabled-option';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdSelectDisabledOption],
  exports: [NgbdSelectDisabledOption],
  bootstrap: [NgbdSelectDisabledOption]
})
export class NgbdSelectDisabledOptionModule {
}
