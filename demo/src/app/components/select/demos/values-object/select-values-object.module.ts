import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgbdSelectValuesObject} from './select-values-object';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdSelectValuesObject],
  exports: [NgbdSelectValuesObject],
  bootstrap: [NgbdSelectValuesObject]
})
export class NgbdSelectValuesObjectModule {
}
