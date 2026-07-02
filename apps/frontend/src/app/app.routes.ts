import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { TodoPage } from './pages/todo-page/todo-page';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
  },
  {
    path: 'todo',
    component: TodoPage,
  },
];
