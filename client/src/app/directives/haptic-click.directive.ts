import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[hapticClick]'
})
export class HapticClickDirective {

  constructor() { }

  @HostListener('click') click() {
    navigator.vibrate(150);
  }
}
