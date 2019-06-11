import {NgModule} from '@angular/core';

import {NgbdSharedModule} from '../../shared';
import {ComponentWrapper} from '../../shared/component-wrapper/component-wrapper.component';
import {NgbdComponentsSharedModule, NgbdDemoList} from '../shared';
import {NgbdApiPage} from '../shared/api-page/api.component';
import {NgbdExamplesPage} from '../shared/examples-page/examples.component';
import {NgbdLoaderBasic} from './demos/basic/loader-basic';
import {NgbdLoaderBasicModule} from './demos/basic/loader-basic.module';
import {NgbdLoaderCustomColor} from './demos/custom-color/loader-custom-color';
import {NgbdLoaderCustomColorModule} from './demos/custom-color/loader-custom-color.module';
import {NgbdLoaderTimeoutTreshold} from './demos/timeout-treshold/loader-timeout-treshold';
import {NgbdLoaderTimeoutTresholdModule} from './demos/timeout-treshold/loader-timeout-treshold.module';

const DEMOS = {
  basic: {
    title: 'Basic loader',
    type: NgbdLoaderBasic,
    files: [
      {name: 'loader-basic.ts', source: require('!!raw-loader!./demos/basic/loader-basic.ts')},
      {name: 'loader-basic.html', source: require('!!raw-loader!./demos/basic/loader-basic.html')},
    ]
  },
  'custom-color': {
    title: 'Custom progressbar color',
    type: NgbdLoaderCustomColor,
    files: [
      {name: 'loader-custom-color.html', source: require('!!raw-loader!./demos/custom-color/loader-custom-color.html')},
      {name: 'loader-custom-color.ts', source: require('!!raw-loader!./demos/custom-color/loader-custom-color.ts')},
    ]
  },
  'treshold': {title: 'Fullscreen display timeout', type: NgbdLoaderTimeoutTreshold, files: []}
};

export const ROUTES = [
  {path: '', pathMatch: 'full', redirectTo: 'examples'}, {
    path: '',
    component: ComponentWrapper,
    children: [{path: 'examples', component: NgbdExamplesPage}, {path: 'api', component: NgbdApiPage}]
  }
];

@NgModule({
  imports: [
    NgbdSharedModule, NgbdComponentsSharedModule, NgbdLoaderBasicModule, NgbdLoaderCustomColorModule,
    NgbdLoaderTimeoutTresholdModule
  ]
})
export class NgbdLoaderModule {
  constructor(demoList: NgbdDemoList) { demoList.register('loader', DEMOS); }
}
