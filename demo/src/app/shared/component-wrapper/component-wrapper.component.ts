import { ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngbd-component-wrapper',
  templateUrl: './component-wrapper.component.html',
})
export class ComponentWrapper {
  activeTab = 'examples';

  component: string;

  fileTypes = [
    ['T', 'HTML template file', 'btn-secondary'],
    ['C', 'Component typescript file', 'btn-info']
  ];

  hasOverview = false;

  isSmallScreenOrLess: boolean;
  isLargeScreenOrLess: boolean;
  isMobile: boolean;

  links: { href: string; title: string }[] = [];

  sidebarCollapsed = true;

  constructor(
    route: ActivatedRoute,
    router: Router,
    ngZone: NgZone,
    private _element: ElementRef,
    private _changeDetector: ChangeDetectorRef
  ) {
    this.hasOverview = route.routeConfig.children.some(
      r => r.path === 'overview'
    );
    route.url.subscribe(segments => {
      this.component = segments[0].path;
      this.activeTab = route.snapshot.firstChild.routeConfig.path;
    });

    // information extracted from https://getbootstrap.com/docs/4.1/layout/overview/
    // TODO: we should implements our own mediamatcher, according to bootstrap layout.
    const smallScreenQL = matchMedia('(max-width: 767.98px)');
    smallScreenQL.addListener(event =>
      ngZone.run(() => (this.isSmallScreenOrLess = event.matches))
    );
    this.isSmallScreenOrLess = smallScreenQL.matches;

    const largeScreenQL = matchMedia('(max-width: 1199.98px)');
    this.isLargeScreenOrLess = largeScreenQL.matches;
    largeScreenQL.addListener(event =>
      ngZone.run(() => (this.isLargeScreenOrLess = event.matches))
    );
  }
}
