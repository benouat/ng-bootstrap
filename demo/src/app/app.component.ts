import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Analytics } from './shared/analytics/analytics';


@Component({
  selector: 'ngbd-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  navbarCollapsed = true;

  constructor(private _analytics: Analytics, router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const {fragment} = router.parseUrl(router.url);
        if (fragment) {
          const element = document.querySelector(`#${fragment}`);
          if (element) {
            element.scrollIntoView();
          }
        } else {
          window.scrollTo({top: 0});
        }
      }
    });
  }

  ngOnInit(): void { this._analytics.trackPageViews(); }
}
