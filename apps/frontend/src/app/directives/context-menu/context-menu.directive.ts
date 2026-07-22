import { Directive, output } from '@angular/core';

export type position = { x: number; y: number };

@Directive({
  selector: '[appContextMenu]',
  host: {
    '(contextmenu)': 'onContextMenu($event)',
  },
})
export class ContextMenuDirective {
  rightClickPosition = output<position>();

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    const position: position = { x: event.clientX, y: event.clientY };

    this.rightClickPosition.emit(position);
  }
}
