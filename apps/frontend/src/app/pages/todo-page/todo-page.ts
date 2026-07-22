import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoService } from '../../services/todo-service/todo-service';
import { IApiTodoList, ITodoItem } from '@riseof-website/shared-types';
import { TodoItem } from '../../components/todo-item/todo-item';
import { CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Dialog, DialogInput } from '../../components/dialog/dialog';
import { Toast } from '../../components/toast/Toast';
import { FormControl, Validators } from '@angular/forms';
import { ContextMenu } from '../../components/context-menu/ContextMenu';
import { timer } from 'rxjs';
import {
  ContextMenuDirective,
  position,
} from '../../directives/context-menu/context-menu.directive';

@Component({
  selector: 'app-todo-page',
  imports: [TodoItem, CdkDropList, Dialog, Toast, ContextMenu, ContextMenuDirective],
  templateUrl: './todo-page.html',
  styleUrl: './todo-page.css',
})
export class TodoPage implements OnInit {
  private todoService = inject(TodoService);
  private currentListName = signal<string>('');
  todoLists = signal<IApiTodoList[]>([]);
  todoItems = signal<ITodoItem[]>([]);
  displayContextMenu = signal<boolean>(false);
  contextMenuPosition = signal<position>({ x: 0, y: 0 });

  addListDialogInputsArray: DialogInput[] = [
    {
      control: new FormControl('ListName', [Validators.required, Validators.maxLength(10)]),
      label: 'List name',
    },
  ];

  addItemDialogInputsArray: DialogInput[] = [
    {
      control: new FormControl('header', Validators.required),
      label: 'header',
    },
    {
      control: new FormControl('body', Validators.required),
      label: 'body',
    },
  ];

  ngOnInit(): void {
    this.todoService.getTodoLists().subscribe((res) => {
      this.todoLists.set(res.data);

      if (res.data && res.data.length > 0) {
        this.getItemsOfList(res.data[0].name);
      }
    });
  }

  getItemsOfList(listName: string) {
    this.todoService.getTodoList(listName).subscribe((res) => {
      this.todoItems.set(res.data.items);
    });

    this.currentListName.set(listName);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todoItems(), event.previousIndex, event.currentIndex);
  }

  onDataUpdate(item: ITodoItem | undefined) {
    if (item) {
      this.todoService.patchTodoItem(this.currentListName(), item).subscribe((res) => {
        this.todoItems.set(res.data);
      });
    }
  }

  addNewTodoList(event: Record<string, unknown>) {
    const listName = event[this.addListDialogInputsArray[0].label] as string;

    this.todoService.addTodoList(listName).subscribe(() => {
      this.ngOnInit();
    });
  }

  addNewTodoItem(event: Record<string, unknown>) {
    const item: ITodoItem = {
      id: '',
      header: event[this.addItemDialogInputsArray[0].label] as string,
      body: event[this.addItemDialogInputsArray[1].label] as string,
      status: false,
    };

    this.todoService.addTodoItem(this.currentListName(), item).subscribe(() => {
      this.ngOnInit();
    });
  }

  rightClick(event: position) {
    timer(1).subscribe(() => {
      this.contextMenuPosition.set(event);
      this.displayContextMenu.set(true);
    });
  }
}
