import { Component, ElementRef, inject, input, output, viewChild } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
import { LucideCircleX } from '@lucide/angular';
import { timer } from 'rxjs';
import { ToastService } from '../../services/toast/toast-service';
import { Toast } from '../toast/Toast';

export interface DialogInput {
  control: FormControl;
  label: string;
  optionalLabel?: string;
  placeholder?: string;
}

@Component({
  selector: 'app-dialog',
  imports: [LucideCircleX, ReactiveFormsModule, Toast],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class Dialog {
  toastService = inject(ToastService);

  id = input.required<string>();
  inputArray = input.required<DialogInput[]>();

  controls: FormControl<DialogInput>[] = [];
  form: FormArray<FormControl<DialogInput>> = new FormArray<FormControl<DialogInput>>([]);

  outputValues = output<Record<string, unknown>>();

  dialogRef = viewChild<ElementRef<HTMLDialogElement>>('dialogRef');

  formControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(1)],
  });

  openModal() {
    this.dialogRef()?.nativeElement.showModal();
  }

  closeModal() {
    this.dialogRef()?.nativeElement.close();

    timer(1000).subscribe(() => {
      this.formControl.reset('');
      this.formControl.markAsUntouched();
      this.formControl.markAsPristine();
    });
  }

  onSave() {
    if (this.formControl.valid) {
      this.inputValue.emit(this.formControl.value);

      this.closeModal();
    } else {
      this.closeModal();
      timer(100).subscribe(() => {
        this.toastService.toasterOn('List name should not be empty');
      });
    }
  }
}
