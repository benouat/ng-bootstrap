import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgbdSelectMultiple} from './select-multiple';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdSelectMultiple],
  exports: [NgbdSelectMultiple],
  bootstrap: [NgbdSelectMultiple]
})
export class NgbdSelectMultipleModule {
}
