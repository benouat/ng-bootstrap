import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgbdSelectCustomTemplate} from './select-custom-template';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdSelectCustomTemplate],
  exports: [NgbdSelectCustomTemplate],
  bootstrap: [NgbdSelectCustomTemplate]
})
export class NgbdSelectCustomTemplateModule {
}
