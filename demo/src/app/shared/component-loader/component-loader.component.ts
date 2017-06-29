
import {ActivatedRoute} from '@angular/router';

import {NgbdAccordion} from './../../components/accordion/accordion.component';
import {NgbdAlert} from './../../components/alert/alert.component';
import {NgbdButtons} from './../../components/buttons/buttons.component';
import {NgbdTypeahead} from './../../components/typeahead/typeahead.component';
import {NgbdTooltip} from './../../components/tooltip/tooltip.component';
import {NgbdTimepicker} from './../../components/timepicker/timepicker.component';
import {NgbdTabs} from './../../components/tabset/tabset.component';
import {NgbdRating} from './../../components/rating/rating.component';
import {NgbdProgressbar} from './../../components/progressbar/progressbar.component';
import {NgbdPopover} from './../../components/popover/popover.component';
import {NgbdPagination} from './../../components/pagination/pagination.component';
import {NgbdModal} from './../../components/modal/modal.component';
import {NgbdDropdown} from './../../components/dropdown/dropdown.component';
import {NgbdDatepicker} from './../../components/datepicker/datepicker.component';
import {NgbdCollapse} from './../../components/collapse/collapse.component';
import {NgbdCarousel} from './../../components/carousel/carousel.component';

import {Component, ComponentFactoryResolver, ViewContainerRef, ComponentRef, Injector} from '@angular/core';


const COMPONENTS_CLASS = {
  'accordion': NgbdAccordion,
  'alert': NgbdAlert,
  'buttons': NgbdButtons,
  'carousel': NgbdCarousel,
  'collapse': NgbdCollapse,
  'datepicker': NgbdDatepicker,
  'dropdown': NgbdDropdown,
  'modal': NgbdModal,
  'pagination': NgbdPagination,
  'popover': NgbdPopover,
  'progressbar': NgbdProgressbar,
  'rating': NgbdRating,
  'tabs': NgbdTabs,
  'timepicker': NgbdTimepicker,
  'tooltip': NgbdTooltip,
  'typeahead': NgbdTypeahead,
};

@Component({
  template: ``
})
export class ComponentLoader {
  public componentName: string;

  componentRef: ComponentRef<any>;

  constructor(
    private injector: Injector,
    private cptFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      if (this.componentRef) {
        this.componentRef.destroy();
        this.componentRef = null;
      }

      this.componentName = params['componentName'];
      const cf = this.cptFactoryResolver.resolveComponentFactory(COMPONENTS_CLASS[this.componentName]);
      this.componentRef = this.viewContainerRef.createComponent(cf);

      document.body.scrollIntoView();
    });
  }
}
