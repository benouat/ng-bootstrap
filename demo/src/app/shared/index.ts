import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Analytics } from './analytics/analytics';
import { CodeHighlightService } from './code/code-highlight.service';
import { NgbdCodeComponent } from './code/code.component';
import { ComponentWrapper } from './component-wrapper/component-wrapper.component';
import { ContentNavigationComponent } from './content-nav/content-nav.component';
import { PageWrapper } from './page-wrapper/page-wrapper.component';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule],
  exports: [
    CommonModule,
    RouterModule,
    ComponentWrapper,
    PageWrapper,
    SideNavComponent,
    NgbdCodeComponent,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    ComponentWrapper,
    PageWrapper,
    SideNavComponent,
    NgbdCodeComponent,
    ContentNavigationComponent
  ],
  providers: [Analytics, CodeHighlightService]
})
export class NgbdSharedModule {
}
