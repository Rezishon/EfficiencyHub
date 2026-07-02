import { Component, input, OnInit, output, signal } from '@angular/core';
import { ITodoItem } from '@riseof-website/shared-types';
import { CdkDrag } from '@angular/cdk/drag-drop';
import {
  LucideCircle,
  LucideCircleCheckBig,
  LucideIconInput,
  LucideDynamicIcon,
} from '@lucide/angular';

@Component({
  selector: 'app-todo-item',
  imports: [CdkDrag, LucideDynamicIcon],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem implements OnInit {
  itemData = input.required<ITodoItem>();
  currentIcon = signal<LucideIconInput>(LucideCircle);
  itemChangedData = output<ITodoItem>();
  currentData = signal<ITodoItem | undefined>(undefined);
  updatedItem = output<ITodoItem | undefined>();

  ngOnInit(): void {
    this.currentData.set(this.itemData());

    if (this.itemData().status) {
      this.currentIcon.set(LucideCircleCheckBig);
    } else {
      this.currentIcon.set(LucideCircle);
    }
  }

  onStatusChange() {
    if (this.currentIcon() === LucideCircle) {
      this.valueUpdater({ status: true });
      this.updatedItem.emit(this.currentData());

      this.currentIcon.set(LucideCircleCheckBig);
    } else {
      this.valueUpdater({ status: false });
      this.updatedItem.emit(this.currentData());

      this.currentIcon.set(LucideCircle);
    }
  }

  valueUpdater({
    id = this.itemData().id,
    header = this.itemData().header,
    body = this.itemData().body,
    status = this.itemData().status,
  }: Partial<ITodoItem>) {
    this.currentData.set({ id, header, body, status });
  }
}
