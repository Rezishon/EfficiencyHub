import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoService } from '../../services/todo-service/todo-service';
import { IApiTodoList, ITodoItem } from '@riseof-website/shared-types';
import { TodoItem } from '../../components/todo-item/todo-item';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Dialog } from '../../components/dialog/dialog';
import { Toast } from '../../components/toast/Toast';

@Component({
  selector: 'app-todo-page',
  imports: [TodoItem, CdkDropList, Dialog, Toast],
  templateUrl: './todo-page.html',
  styleUrl: './todo-page.css',
})
export class TodoPage implements OnInit {
  private todoService = inject(TodoService);
  private currentListName = signal<string>('');
  todoLists = signal<IApiTodoList[]>([]);
  todoItems = signal<ITodoItem[]>([]);

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

  addNewTodoList(listName: string) {
    this.todoService.addTodoList(listName).subscribe((res) => {
      this.ngOnInit();
      console.log(res);
    });
  }
}
