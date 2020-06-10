import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgbdSelectBasic} from './select-basic';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdSelectBasic],
  exports: [NgbdSelectBasic],
  bootstrap: [NgbdSelectBasic]
})
export class NgbdSelectBasicModule {
}
