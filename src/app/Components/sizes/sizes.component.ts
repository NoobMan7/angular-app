import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SizeService } from 'src/app/Services/size.service';

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.css']
})
export class SizesComponent {
  sizesForm: FormGroup;
  isModalOpen = false;
  sizeService = inject(SizeService);

  constructor(private fb: FormBuilder) {
    this.sizesForm = this.fb.group({
      chest: ['', Validators.required],
      waist: ['', Validators.required],
      arms: ['', Validators.required],
      thigh: ['', Validators.required],
      height: ['', Validators.required],
      shoulderWidth: ['', Validators.required],
      weight: ['', Validators.required]

    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
  onSubmit(): void {
    if (this.sizesForm.valid) {
      console.log(this.sizesForm.value);
      this.sizeService.addMeasurement(this.sizesForm.value).subscribe({
        next: () => {
          alert('Measurements Stored successfully');
        },
        error: (err) => {

        }
      });
      this.closeModal();
      // Handle form submission logic
    } else {
      console.log('Form is invalid');
    }
  }

  // selct Body part 
  showResult(event: any) {
    const selectedValue = event.target.value;
    console.log('Selected Value:', selectedValue);
    this.sizeService.getDataByName(selectedValue).subscribe({
      next: () => {
        console.log("Data Retrieval Successfully");
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
