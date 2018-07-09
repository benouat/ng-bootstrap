import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngbd-side-nav',
  templateUrl: './side-nav.component.html'
})
export class SideNavComponent {
  components = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.components = this.router.config
      .find(route => route.path === 'components')
      .children.filter(route => route.path.length > 0)
      .map(route => route.path);
  }

  isActive(currentRoute: any[], exact = true): boolean {
    return this.router.isActive(this.router.createUrlTree(currentRoute), exact);
  }
}
