import { NgModule } from '@angular/core';

import { NgbdSharedModule } from '../../shared';
import { NgbdApiDocs, NgbdApiDocsBadge, NgbdApiDocsClass, NgbdApiDocsConfig } from './api-docs';
import { ExampleBoxComponent } from './example-box';
import { NgbdFragment } from './fragment';

@NgModule({
  imports: [NgbdSharedModule],
  declarations: [
    ExampleBoxComponent, NgbdApiDocsBadge, NgbdApiDocs, NgbdApiDocsClass, NgbdApiDocsConfig,
    NgbdFragment
  ],
  exports: [
    ExampleBoxComponent, NgbdApiDocsBadge, NgbdApiDocs, NgbdApiDocsClass, NgbdApiDocsConfig,
    NgbdFragment
  ]
})
export class NgbdComponentsSharedModule {}
