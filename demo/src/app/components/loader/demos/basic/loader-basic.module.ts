import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgbdLoaderBasic} from './loader-basic';


@NgModule({imports: [BrowserModule, NgbModule], declarations: [NgbdLoaderBasic], bootstrap: [NgbdLoaderBasic]})
export class NgbdLoaderBasicModule {
}
