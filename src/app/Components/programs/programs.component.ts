import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProgramService } from 'src/app/Services/program.service';
import * as bootstrap from 'bootstrap';
import { WorkoutService } from 'src/app/Services/workout.service';
@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css'],
})
export class ProgramsComponent {
  @ViewChild('exampleModalCenter') modal: ElementRef | undefined;
programName: string = "";
isInput:boolean=true;
programService = inject(ProgramService);
programData: any;
cards: any[] = [];
selectedCardIndex: number | null = null;  // To track which card's form is open
editingCardIndex: number | null = null;   // To track which card is being edited
editingWorkoutIndex: number | null = null; // To track which workout is being edited
editedWorkout: string = '';  // Store the currently edited workout text
newWorkout: string = '';     // Store new workout text for the form // Holds the edited workout value
isModalOpen = false;  // This controls the modal visibility
hoveredCardIndex: number | null = null;
cd = inject(ChangeDetectorRef);
expandedCardIndex: number | null = null;
isEdit : boolean = false;
editedProgramName:string ="";
data:any; // for edit program data
workoutService = inject(WorkoutService);
ngOnInit() {
  const clientId = sessionStorage.getItem("firebaseId")!;
  
  // Fetch the programs once when the component initializes
  this.programService.getPrograms(clientId);

  // Subscribe to the BehaviorSubject to get program data dynamically
  this.programService.getProgramObservable().subscribe({
    next: (programData) => {
      // Map over the program data to create the cards array dynamically
      this.cards = programData.map((program: any) => ({
        title: program.programName,
        date: program.date || 'No date provided',
        content: program.content || 'No content available',
        workouts: program.workouts.map((workout: any) => ({
          workoutName: workout.workoutName,
          workoutDate: workout.date,
        })),
        programId: program.programId,
        clientId: program.clientId,
      }));
    },
    error: (err) => {
      console.error(err);
    }
  });
}
SaveProgram(){
  this.closeModal();
  if(this.programName)
  { const id = sessionStorage.getItem("firebaseId");
    const formData = new FormData();
    formData.append("ProgramName", this.programName);
    formData.append("ClientId",id!);
    console.log(id);
    
    this.programService.createProgram(formData).subscribe(
      {
        next:(res)=>{
          console.log(res);
          this.reloadProgramList();
          this.close();
        },
        error:(err)=>{
          console.log(err);
        }
      }
    );
    console.log("kjdbckdj");
  }
}
reloadProgramList()
{
  const clientId = sessionStorage.getItem("firebaseId")!;
  this.programService.getPrograms(clientId);
}
programInput(){
  this.isInput=false;
}
openModal(){
  this.isModalOpen = true;
}

closeModal() {
  this.isModalOpen = false;
}
close(){
  this.programName= "";
  this.isInput=true;
  console.log("zdf");
  if (this.modal) {
    const modalElement = this.modal.nativeElement as HTMLElement;
    // Use native Bootstrap method to hide the modal
    const bsModal = new bootstrap.Modal(modalElement);
    bsModal.hide();
  }
}


toggleForm(index: number) {
  if (this.selectedCardIndex === index) {
    this.selectedCardIndex = null;  // Close the form if it's already open
  } else {
    this.selectedCardIndex = index;  // Open the form for the selected card
  }
}
toggleProgramAddbtn(index:number, card:any){
  console.log(card);
  
  if (this.selectedCardIndex === index) {
    this.selectedCardIndex = null;  // Close the form if it's already open
  } else {
    this.selectedCardIndex = index;  // Open the form for the selected card
  }
}
expandCard(index: number) {
  if (this.expandedCardIndex === index) {
    this.expandedCardIndex = null; // Collapse if clicked again
  } else {
    this.expandedCardIndex = index; // Expand the clicked card
  }
}
// Add workout to the selected card
addWorkout(card: any): void {
  console.log(card);
  
  if (this.newWorkout.trim()) {
    const formData = new FormData();
    const date = new Date();
    formData.append('ProgramId',card.programId);
    formData.append('workoutName',this.newWorkout);
    this.workoutService.createWorkout(formData).subscribe({
      next:(res)=>{
        console.log(res);
        this.reloadProgramList();
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    // card.workouts.push(this.newWorkout);
    this.newWorkout = '';
    this.selectedCardIndex = null;  // Close form after adding
  }
}

showActions(index: number) {
  this.hoveredCardIndex = index;
}

// Function to hide actions when not hovering
hideActions(index: number) {
  this.hoveredCardIndex = null;
}

// On edit card function
onEditCard(card: any) {
  this.editedProgramName = card.title;
  this.isEdit = true;
  this.isModalOpen = true;
  console.log('Edit card:', card);
  this.data = {
    programName: this.editedProgramName,
    programId: card.programId
  };
}
//EditedProgram
SaveEditedProgram(){
  if(this.data) {
    this.data.programName = this.editedProgramName;
    this.programService.editProgram(this.data).subscribe(
      {
        next:(res)=>{
          this.reloadProgramList();
          alert("Edit Succesfully");
          console.log(res);
          this.closeModal();
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      }
    );
  }
  else {
    this.closeModal();
  }
 
}
// On delete card function
onDeleteCard(card: any) {
  console.log('Delete card:', card);
  this.programService.deleteProgram(card.programId).subscribe({
    next:(res)=>{
      this.reloadProgramList();
      alert("Deleted!!!");
    },
    error:(err)=>{
      alert("Error Occurred!!");
    }
  });
}
}
