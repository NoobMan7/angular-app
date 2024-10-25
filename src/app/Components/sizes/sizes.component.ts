import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Measurements } from 'src/app/Models/measurement';
import { SizeService } from 'src/app/Services/size.service';

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.css']
})
export class SizesComponent implements OnInit {
  sizesForm: FormGroup;
  isModalOpen = false;
  sizeService = inject(SizeService);
  measurements: Measurements[] = [];
  isBodyPartSelected: boolean = false;
  isMonthSelected: boolean = false;
  selectedMonth: Date | undefined;
  selectedValue: any;
  dataByName: any;
  month:any;
  currentMonth: string | undefined;
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
  ngOnInit(): void {
    this.sizeService.getMeasurements().subscribe({
      next: data => {
        this.measurements = data;
        console.log(data);
      },
    });
   
      const now = new Date();
      const year = now.getFullYear();
      const month = ('0' + (now.getMonth() + 1)).slice(-2); // Pad single digits with zero
      this.month = `${year}-${month}`;
   
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

  // select Body part 
  showResult(event: any) {
      this.isBodyPartSelected = true;
      this.selectedValue = event.target.value;
      console.log('Selected Value:', this.selectedValue);
    }



  onMonthChange(event: any): void {
    this.selectedMonth = new Date(event.target.value);
    // this.filterDataByMonth(this.selectedMonth);
    console.log(this.selectedMonth);
    const month = this.selectedMonth!.getMonth();
    const year = this.selectedMonth!.getFullYear();
    console.log(this.month);

  }


  filterByMonth(data: any[], month:any) {
    console.log("filter",data,month);
    
    return data.filter(item => {
      const date = new Date(item.dateMeasured);
      return date.getMonth() === month; // getMonth() is zero-based, so August is 7
    });
  }


  getData() {
    console.log(this.selectedValue);
    
    if (this.isBodyPartSelected) {
      console.log("GET DATA");
      this.sizeService.getDataByName(this.selectedValue).subscribe({
        next: (data) => {
          console.log("Data Retrieval Successfully");
          const month = this.selectedMonth!.getMonth();
          const year = this.selectedMonth!.getFullYear();
          console.log(this.selectedValue);
          const filterData = this.filterByMonth(data,month);
          this.sizeService.selectBodyPartData(filterData);
          this.dataByName = data;
          console.log(filterData);
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    else {
      alert("Select Details");
    }
  }
}
