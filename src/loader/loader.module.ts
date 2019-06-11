import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {NgbLoader, NgbLoaderContent} from './loader.component';

export {NgbLoader, NgbLoaderContent} from './loader.component';
@NgModule({
  imports: [CommonModule],
  exports: [NgbLoader, NgbLoaderContent],
  declarations: [NgbLoader, NgbLoaderContent],
})
export class NgbLoaderModule {
}
