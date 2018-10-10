import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

// we never need this, because bootstrap is doing that on its own (if bootstrap.js and jquery for bootstrap are installed)
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
  constructor() { }

}
