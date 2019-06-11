import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgbdLoaderCustomColor} from './loader-custom-color';


@NgModule(
    {imports: [BrowserModule, NgbModule], declarations: [NgbdLoaderCustomColor], bootstrap: [NgbdLoaderCustomColor]})
export class NgbdLoaderCustomColorModule {
}
