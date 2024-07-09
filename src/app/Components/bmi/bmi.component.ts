import { Component } from '@angular/core';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css']
})
export class BmiComponent {
onSubmit() {
throw new Error('Method not implemented.');
}
  isModalOpen: boolean = false;
  height: any;
  weight: any;
  gender: any;
  bmiResult: any;
  bmiInterpretation: any;
  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
  calculateBMI() {
    if (this.height && this.weight && this.gender) {
      const heightMeters = this.height / 100;
      this.bmiResult = this.weight / (heightMeters * heightMeters);
      this.setInterpretation();
      this.closeModal();
    }
  }

  setInterpretation() {
    if (this.bmiResult < 18.5) {
      this.bmiInterpretation = 'Underweight';
    } else if (this.bmiResult >= 18.5 && this.bmiResult < 25) {
      this.bmiInterpretation = 'Normal weight';
    } else if (this.bmiResult >= 25 && this.bmiResult < 30) {
      this.bmiInterpretation = 'Overweight';
    } else {
      this.bmiInterpretation = 'Obese';
    }
  }
}
