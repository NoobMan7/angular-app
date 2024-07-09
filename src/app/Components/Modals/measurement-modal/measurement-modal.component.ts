import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-measurement-modal',
  templateUrl: './measurement-modal.component.html',
  styleUrls: ['./measurement-modal.component.css']
})
export class MeasurementModalComponent {
  formVisible = false;

  toggleForm() {
    this.formVisible = !this.formVisible;
  }

  closeForm() {
    this.formVisible = false;
  }
}
