import { Injectable, signal } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastStatus = signal<boolean>(false);
  toastMessage = signal<string>('');

  toasterOn(message: string) {
    this.toastMessage.set(message);
    this.toastStatus.set(true);
    timer(1500).subscribe(() => {
      this.toastStatus.set(false);
    });
  }
}
