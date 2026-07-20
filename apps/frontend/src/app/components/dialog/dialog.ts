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

  syncFormControls() {
    const items = this.inputArray();

    this.controls = items.map((item) => item.control);

    this.form.clear({ emitEvent: false });

    this.controls.forEach((control) => {
      this.form.push(control, { emitEvent: false });
    });

    this.form.reset();
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
  }

  openModal() {
    this.syncFormControls();

    this.dialogRef()?.nativeElement.showModal();
  }

  closeModal() {
    this.dialogRef()?.nativeElement.close();

    timer(700).subscribe(() => {
      this.form.reset();
      this.form.markAsUntouched();
    });
  }

  onEnterPress(event: Event): void {
    event.preventDefault();
    this.onSave();
  }

  onSave() {
    if (this.form.valid) {
      const dataPayload = this.inputArray().reduce(
        (record, item) => {
          record[item.label] = item.control.value;
          return record;
        },
        {} as Record<string, unknown>,
      );

      this.outputValues.emit(dataPayload);

      this.closeModal();
    } else {
      let errorMessage = 'Invalid input';
      this.closeModal();

      const invalidItem = this.inputArray().find((item) => item.control.invalid);

      if (invalidItem) {
        const control = invalidItem.control;
        const label = invalidItem.label;

        if (control.hasError('required')) {
          errorMessage = `${label} should not be empty`;
        } else if (control.hasError('maxlength')) {
          errorMessage = `${label} should not be more than 10 characters`;
        } else if (control.hasError('minlength')) {
          errorMessage = `${label} should not be less than 10 characters`;
        }
      }

      timer(100).subscribe(() => {
        this.toastService.toasterOn(errorMessage);

        this.form.markAllAsTouched();
        this.form.updateValueAndValidity();
      });
    }
  }
}
