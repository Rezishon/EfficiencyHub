import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast/toast-service';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './Toast.html',
  styleUrl: './Toast.css',
})
export class Toast {
  toastService = inject(ToastService);
}
