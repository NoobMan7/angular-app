import { Component, Input } from '@angular/core';
import { Exercise } from 'src/app/Models/exercise';

@Component({
  selector: 'app-exercise-table',
  templateUrl: './exercise-table.component.html',
  styleUrls: ['./exercise-table.component.css']
})
export class ExerciseTableComponent {
  @Input() exercises: Exercise[] = [];
   
}
