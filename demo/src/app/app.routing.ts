import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  NgbdAccordionApi,
  NgbdAccordionExamples,
  NgbdAlertApi,
  NgbdAlertExamples,
  NgbdButtonsApi,
  NgbdButtonsExamples,
  NgbdCarouselApi,
  NgbdCarouselExamples,
  NgbdCollapseApi,
  NgbdCollapseExamples,
  NgbdDatepickerApi,
  NgbdDatepickerExamples,
  NgbdDatepickerOverview,
  NgbdDropdownApi,
  NgbdDropdownExamples,
  NgbdModalApi,
  NgbdModalExamples,
  NgbdPaginationApi,
  NgbdPaginationExamples,
  NgbdPopoverApi,
  NgbdPopoverExamples,
  NgbdProgressbarApi,
  NgbdProgressbarExamples,
  NgbdRatingApi,
  NgbdRatingExamples,
  NgbdTabsApi,
  NgbdTabsExamples,
  NgbdTimepickerApi,
  NgbdTimepickerExamples,
  NgbdTooltipApi,
  NgbdTooltipExamples,
  NgbdTypeaheadApi,
  NgbdTypeaheadExamples,
} from './components';
import { DefaultComponent } from './default';
import { GettingStarted } from './getting-started';
import { ComponentWrapper } from './shared/component-wrapper/component-wrapper.component';

const DEFAULT_API_PATH = {
  path: '',
  pathMatch: 'full',
  redirectTo: 'examples'
};

const DEFAULT_API_PATH_OVERVIEW = {
  path: '',
  pathMatch: 'full',
  redirectTo: 'overview'
};

const componentRoutes = [
  {
    path: 'accordion',
    component: ComponentWrapper,
    children: [
      DEFAULT_API_PATH,
      { path: 'examples', component: NgbdAccordionExamples },
      { path: 'api', component: NgbdAccordionApi }
    ]
  },
  {
    path: 'alert',
    component: ComponentWrapper,
    children: [
      DEFAULT_API_PATH,
      { path: 'examples', component: NgbdAlertExamples },
      { path: 'api', component: NgbdAlertApi }
    ]
  },
  {
    path: 'buttons',
    component: ComponentWrapper,
    children: [
      DEFAULT_API_PATH,
      { path: 'examples', component: NgbdButtonsExamples },
      { path: 'api', component: NgbdButtonsApi }
    ]
  },
  {
    path: 'carousel',
    component: ComponentWrapper,
    children: [
      DEFAULT_API_PATH,
      { path: 'examples', component: NgbdCarouselExamples },
      { path: 'api', component: NgbdCarouselApi }
    ]
  },
  {
    path: 'collapse',
    component: ComponentWrapper,
    children: [
      DEFAULT_API_PATH,
      { path: 'examples', component: NgbdCollapseExamples },
      { path: 'api', component: NgbdCollapseApi }
    ]
  },
  {
    path: 'datepicker',
    component: ComponentWrapper,
    children: [
      DEFAULT_API_PATH_OVERVIEW,
      { path: 'overview', component: NgbdDatepickerOverview },
      { path: 'examples', component: NgbdDatepickerExamples },
      { path: 'api', component: NgbdDatepickerApi }
    ]
  },
  {
    path: 'dropdown',
    component: ComponentWrapper,
    children: [
      DEFAULT_API_PATH,
      { path: 'examples', component: NgbdDropdownExamples },
      { path: 'api', component: NgbdDropdownApi }
    ]
  },
  {
    path: 'modal',
    component: ComponentWrapper,
    children: [
      DEFAULT_API_PATH,
      { path: 'examples', component: NgbdModalExamples },
      { path: 'api', component: NgbdModalApi }
    ]
  },
  {
    path: 'pagination',
    component: ComponentWrapper,
    children: [
      DEFAULT_API_PATH,
      { path: 'examples', component: NgbdPaginationExamples },
      { path: 'api', component: NgbdPaginationApi }
    ]
  },
  {
    path: 'popover',
    component: ComponentWrapper,
    children: [
      DEFAULT_API_PATH,
      { path: 'examples', component: NgbdPopoverExamples },
      { path: 'api', component: NgbdPopoverApi }
    ]
  },
  {
    path: 'progressbar',
    component: ComponentWrapper,
    children: [
      DEFAULT_API_PATH,
      { path: 'examples', component: NgbdProgressbarExamples },
      { path: 'api', component: NgbdProgressbarApi }
    ]
  },
  {
    path: 'rating',
    component: ComponentWrapper,
    children: [
      DEFAULT_API_PATH,
      { path: 'examples', component: NgbdRatingExamples },
      { path: 'api', component: NgbdRatingApi }
    ]
  },
  {
    path: 'tabs',
    component: ComponentWrapper,
    children: [
      DEFAULT_API_PATH,
      { path: 'examples', component: NgbdTabsExamples },
      { path: 'api', component: NgbdTabsApi }
    ]
  },
  {
    path: 'timepicker',
    component: ComponentWrapper,
    children: [
      DEFAULT_API_PATH,
      { path: 'examples', component: NgbdTimepickerExamples },
      { path: 'api', component: NgbdTimepickerApi }
    ]
  },
  {
    path: 'tooltip',
    component: ComponentWrapper,
    children: [
      DEFAULT_API_PATH,
      { path: 'examples', component: NgbdTooltipExamples },
      { path: 'api', component: NgbdTooltipApi }
    ]
  },
  {
    path: 'typeahead',
    component: ComponentWrapper,
    children: [
      DEFAULT_API_PATH,
      { path: 'examples', component: NgbdTypeaheadExamples },
      { path: 'api', component: NgbdTypeaheadApi }
    ]
  }
];

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: DefaultComponent },
  { path: 'getting-started', component: GettingStarted },
  {
    path: 'components',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'accordion' },
      ...componentRoutes
    ]
  },
  { path: '**', redirectTo: 'home' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: true
});
