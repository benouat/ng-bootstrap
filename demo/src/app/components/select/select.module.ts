import {NgModule} from '@angular/core';

import {NgbdSharedModule} from '../../shared';
import {ComponentWrapper} from '../../shared/component-wrapper/component-wrapper.component';
import {NgbdComponentsSharedModule, NgbdDemoList} from '../shared';
import {NgbdApiPage} from '../shared/api-page/api.component';
import {NgbdExamplesPage} from '../shared/examples-page/examples.component';
import {NgbdSelectBasic} from './demos/basic/select-basic';
import {NgbdSelectCustomTemplate} from './demos/custom-template/select-custom-template';
import {NgbdSelectDisabledOption} from './demos/disabled-option/select-disabled-option';
import {NgbdSelectMultiple} from './demos/multiple/select-multiple';
import {NgbdSelectValuesObject} from './demos/values-object/select-values-object';



export const DEMO_DIRECTIVES =
    [NgbdSelectBasic, NgbdSelectDisabledOption, NgbdSelectMultiple, NgbdSelectCustomTemplate, NgbdSelectValuesObject];

export const DEMOS = {
  basic: {
    title: 'Basic select',
    type: NgbdSelectBasic,
    code: require('!!raw-loader!./demos/basic/select-basic').default,
    markup: require('!!raw-loader!./demos/basic/select-basic.html').default
  },
  'disabled-option': {
    title: 'Disabled option',
    type: NgbdSelectDisabledOption,
    code: require('!!raw-loader!./demos/disabled-option/select-disabled-option').default,
    markup: require('!!raw-loader!./demos/disabled-option/select-disabled-option.html').default
  },
  'values-object': {
    title: 'Value specified as Object',
    type: NgbdSelectValuesObject,
    code: require('!!raw-loader!./demos/values-object/select-values-object').default,
    markup: require('!!raw-loader!./demos/values-object/select-values-object.html').default
  },
  'custom-template': {
    title: 'Custom templates',
    type: NgbdSelectCustomTemplate,
    code: require('!!raw-loader!./demos/custom-template/select-custom-template').default,
    markup: require('!!raw-loader!./demos/custom-template/select-custom-template.html').default
  },
  multiple: {
    title: 'Multiple selections',
    type: NgbdSelectMultiple,
    code: require('!!raw-loader!./demos/multiple/select-multiple').default,
    markup: require('!!raw-loader!./demos/multiple/select-multiple.html').default
  }
};

export const ROUTES = [
  {path: '', pathMatch: 'full', redirectTo: 'examples'}, {
    path: '',
    component: ComponentWrapper,
    children: [{path: 'examples', component: NgbdExamplesPage}, {path: 'api', component: NgbdApiPage}]
  }
];


@NgModule({
  imports: [NgbdSharedModule, NgbdComponentsSharedModule],
  declarations: [DEMO_DIRECTIVES],
  entryComponents: [DEMO_DIRECTIVES],
})
export class NgbdSelectModule {
  constructor(demoList: NgbdDemoList) { demoList.register('select', DEMOS); }
}
