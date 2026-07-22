import { Directive, ElementRef, inject, output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  host: {
    '(document:pointerdown)': 'onDocumentClick($event)',
  },
})
export class ClickOutsideDirective {
  private elRef = inject(ElementRef);

  clickOutside = output<Event>();

  onDocumentClick(event: Event): void {
    const targetElement = event.target as Node;

    const clickedInside = this.elRef.nativeElement.contains(targetElement);

    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }
}
