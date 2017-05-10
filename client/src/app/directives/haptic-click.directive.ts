import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[hapticClick]'
})
export class HapticClickDirective {

  constructor() {
    document.addEventListener('deviceready', () => {
      console.log('cordova ready');
    }, false);
  }

  @HostListener('click') click() {
    navigator.vibrate(25);
  }
}
