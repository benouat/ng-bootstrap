import {ActivatedRoute, Router} from '@angular/router';
import {Component, Input, QueryList, TemplateRef, ContentChild} from '@angular/core';

@Component({
  selector: 'ngbd-content-wrapper',
  templateUrl: './content-wrapper.component.html'
})
export class ContentWrapper {
  @Input()
  public title: string | false = false;

  @Input()
  public component: string;

  public activeTab: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.activeTab = this.route.routeConfig.path;
  }

  tabChange(event) {
    this.router.navigate(['..', event.nextId], { relativeTo: this.route });
  }
}
