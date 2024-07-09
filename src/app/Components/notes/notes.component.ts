import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exercise } from 'src/app/Models/exercise';
import { ExerciseService } from 'src/app/Services/exercise.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  exerciseForm: FormGroup;
  isModalOpen = false;
  exerciseservice = inject(ExerciseService);
  constructor(private fb: FormBuilder) {
    this.exerciseForm = this.fb.group({
      exerciseName: ['', Validators.required],
      sets: this.fb.array([])
    });
  }
  exercises: Exercise[] = [
    {
      exerciseName: 'Chest',
      sets: [
        { setNumber: 1, repCount: 12, weight: 25 },
        { setNumber: 2, repCount: 10, weight: 28 }
      ],
      date:new Date('2024-06-25')
    },
    {
      exerciseName: 'Back',
      sets: [
        { setNumber: 1, repCount: 10, weight: 20 },
        { setNumber: 2, repCount: 8, weight: 22 },
        { setNumber: 3, repCount: 8, weight: 24 }
      ],
      date:new Date('2024-06-25')
    },
    {
      exerciseName: 'Legs',
      sets: [
        { setNumber: 1, repCount: 15, weight: 30 },
        { setNumber: 2, repCount: 12, weight: 32 }
      ],
      date:new Date('2024-06-25')
    }
  ];
  get sets(): FormArray {
    return this.exerciseForm.get('sets') as FormArray;
  }

  onSetCountChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const setCount = parseInt(input.value, 10);
    this.updateSets(setCount);
  }

  updateSets(count: number): void {
    this.sets.clear();
    for (let i = 0; i < count; i++) {
      const setGroup = this.fb.group({
        setNumber: [i + 1, Validators.required],
        repCount: ['', [Validators.required, Validators.min(1)]],
        weight: ['', [Validators.required, Validators.min(0)]]
      });
      this.sets.push(setGroup);
    }
  }

  onSubmit(): void {
    if (this.exerciseForm.valid) {
      console.log(this.exerciseForm.value);
      this.exerciseservice.createExercise(this.exerciseForm.value).subscribe();
      this.closeModal();
      // Handle form submission logic
    } else {
      console.log('Form is invalid');
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }


}
