import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonpModule} from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {ContentWrapper} from './content-wrapper/content-wrapper.component';
import {SideNavComponent} from './side-nav/side-nav.component';
import {Analytics} from './analytics/analytics';
import {ComponentLoader} from './component-loader/component-loader.component';

export {componentsList} from './side-nav/side-nav.component';

export {ComponentLoader} from './component-loader/component-loader.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule],
  exports: [
    CommonModule,
    RouterModule,
    ContentWrapper,
    SideNavComponent,
    ComponentLoader,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule
  ],
  declarations: [
    ContentWrapper,
    SideNavComponent,
    ComponentLoader
  ],
  providers: [Analytics]
})
export class NgbdSharedModule {
}
