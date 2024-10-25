import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css']
})
export class BmiComponent {
// onSubmit() {
// throw new Error('Method not implemented.');
// }
//   isModalOpen: boolean = false;
//   height: any;
//   weight: any;
//   gender: any;
//   bmiResult: any;
//   bmiInterpretation: any;
//   bmiHistory: Array<any> = [];
//   openModal(): void {
//     this.isModalOpen = true;
//   }

//   closeModal(): void {
//     this.isModalOpen = false;
//   }
//   calculateBMI() {
//     if (this.height && this.weight && this.gender) {
//       const heightMeters = this.height / 100;
//       this.bmiResult = this.weight / (heightMeters * heightMeters);
//       // this.setInterpretation();
//        // Store in history
//        const bmiRecord = {
//         height: this.height,
//         weight: this.weight,
//         gender: this.gender,
//         bmi: this.bmiResult.toFixed(2),
//         date: new Date()
//       };
//       this.bmiHistory.push(bmiRecord);
//       const modal = document.getElementById('bmiModal');
//       if (modal) {
//         const modalInstance = new bootstrap.Modal(modal);
//         modalInstance.show();
//       }
//       this.closeModal();
//     }
//   }

//   setInterpretation() {
//     if (this.bmiResult < 18.5) {
//       this.bmiInterpretation = 'Underweight';
//     } else if (this.bmiResult >= 18.5 && this.bmiResult < 25) {
//       this.bmiInterpretation = 'Normal weight';
//     } else if (this.bmiResult >= 25 && this.bmiResult < 30) {
//       this.bmiInterpretation = 'Overweight';
//     } else {
//       this.bmiInterpretation = 'Obese';
//     }
//   }
height!: number;
weight!: number;
gender!: string;
bmiResult!: number;
showForm = false;
bmiHistory: Array<any> = [];

toggleForm() {
  this.showForm = !this.showForm;
}

calculateBMI(event: Event) {
  event.preventDefault();
  this.toggleForm()
  if (this.height && this.weight) {
    const heightInMeters = this.height / 100;
    this.bmiResult = Math.round(this.weight / (heightInMeters * heightInMeters)); // No decimal

    // Store in history
    const bmiRecord = {
      height: this.height,
      weight: this.weight,
      gender: this.gender,
      bmi: this.bmiResult,
      date: new Date()
    };
    this.bmiHistory.push(bmiRecord);

    // Show modal for the result
    const modal = document.getElementById('bmiModal');
    if (modal) {
      const modalInstance = new bootstrap.Modal(modal);
      modalInstance.show();
    }

    // Clear form after submission
    this.height = 0;
    this.weight = 0;
    this.gender = '';
  }
}

closeModal() {
  // Get the modal element
  const modalElement = document.getElementById('bmiModal');
  
  if (modalElement) {
    // Initialize the Bootstrap modal
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    
    if (modalInstance) {
      // Hide the modal
      modalInstance.hide();
      
      // After hiding the modal, hide the form
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.showForm = false;  // Hide the form after modal closes
      });
    }
  }
}

}
