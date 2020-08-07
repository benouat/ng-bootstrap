import {InjectionToken, PLATFORM_ID, inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

function generate(sizes) {
  sizes = sizes.sort((a, b) => a[1] - b[1]);
  const dict = {};
  for (let i = 0; i < sizes.length; i++) {
    const name = sizes[i][0];
    const min = sizes[i][1];
    const max = (sizes[i + 1] || [])[1];
    if (min === 0) {
      dict[name] = `(max-width: ${max - 0.01}px)`;
    } else if (max) {
      dict[name] = `(max-width: ${max - 0.01}px) and (min-width: ${min}px)`;
    } else {
      dict[name] = `(min-width: ${min}px)`;
    }
  }
  return dict;
}

const BREAKPOINTS_DEFAULT = {
  'xs': 0,
  'sm': 576,
  'md': 768,
  'lg': 992,
  'xl': 1200,
};

export const BOOTSTRAP_BREAKPOINTS = new InjectionToken('Bootstrap Breakpoints', {
  providedIn: 'root',
  factory() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      const styles = window.getComputedStyle(document.documentElement) as any;
      const breakpointNames = [...styles].filter(p => p.startsWith('--breakpoint-'));

      return generate(
          breakpointNames.map(p => [p.replace('--breakpoint-', ''), Number.parseInt(styles.getPropertyValue(p), 10)]));
    } else {
      return generate(Object.entries(BREAKPOINTS_DEFAULT));
    }
  }
});
