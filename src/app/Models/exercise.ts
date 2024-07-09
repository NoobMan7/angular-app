export interface Set {
    setNumber: number;
    repCount: number;
    weight: number;
  }
  
  export interface Exercise {
    exerciseName: string;
    sets: Set[];
    date: Date;
  }
  