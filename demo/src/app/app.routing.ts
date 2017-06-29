import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DefaultComponent} from './default';
import {GettingStarted} from './getting-started';
import {
  NgbdAccordion,
  NgbdAlert,
  NgbdButtons,
  NgbdCarousel,
  NgbdCollapse,
  NgbdDatepicker,
  NgbdDropdown,
  NgbdModal,
  NgbdPagination,
  NgbdPopover,
  NgbdProgressbar,
  NgbdRating,
  NgbdTabs,
  NgbdTimepicker,
  NgbdTooltip,
  NgbdTypeahead
} from './components';

import { ComponentLoader } from './shared';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: DefaultComponent},
  {path: 'getting-started', component: GettingStarted},

  {path: 'components', redirectTo: 'components/accordion'},
  {
    path: 'components/:componentName',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'api'},
      { path: 'api', component: ComponentLoader },
      { path: 'examples', component: ComponentLoader },
    ]
  }
  // ,
  // {path: 'components', redirectTo: 'components/accordion'},
  // {path: 'components/accordion', component: NgbdAccordion},
  // {path: 'components/alert', component: NgbdAlert},
  // {path: 'components/buttons', component: NgbdButtons},
  // {path: 'components/carousel', component: NgbdCarousel},
  // {path: 'components/collapse', component: NgbdCollapse},
  // {path: 'components/datepicker', component: NgbdDatepicker},
  // {path: 'components/dropdown', component: NgbdDropdown},
  // {path: 'components/modal', component: NgbdModal},
  // {path: 'components/pagination', component: NgbdPagination},
  // {path: 'components/popover', component: NgbdPopover},
  // {path: 'components/progressbar', component: NgbdProgressbar},
  // {path: 'components/rating', component: NgbdRating},
  // {path: 'components/tabs', component: NgbdTabs},
  // {path: 'components/timepicker', component: NgbdTimepicker},
  // {path: 'components/tooltip', component: NgbdTooltip},
  // {path: 'components/typeahead', component: NgbdTypeahead}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
