import { Component, input, model } from '@angular/core';
import { ClickOutsideDirective } from '../../directives/clicked-outside/clicked-outside.directive';
import { position } from '../../directives/context-menu/context-menu.directive';

@Component({
  selector: 'app-context-menu',
  imports: [ClickOutsideDirective],
  templateUrl: './ContextMenu.html',
  styleUrl: './ContextMenu.css',
})
export class ContextMenu {
  componentPosition = input<position>();
  displayComponent = model<boolean>(false);

  onClickOutside() {
    this.displayComponent.set(!this.displayComponent());
  }
}
