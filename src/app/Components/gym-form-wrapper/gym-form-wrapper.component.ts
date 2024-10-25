import { Component, OnInit, ElementRef } from '@angular/core';
import { loadRemoteEntry } from '@angular-architects/module-federation';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

declare var gymFormApp: any;

@Component({
  selector: 'app-gym-form-wrapper',
  template: `<div id="react-app"></div>`,
})
export class GymFormWrapperComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    // const remoteEntry = 'http://localhost:3000/remoteEntry.js'; // Use the proxied URL
    // const remoteApp = 'gymFormApp';
    // const exposedModule = './GymForm';

    // import(/* webpackIgnore: true */ remoteEntry)
    //   .then(() => {
    //     const element = document.getElementById('react-app') as HTMLElement; // Ensure this matches the ID in the template
        
    //     (window as any)[remoteApp].get(exposedModule)
    //       .then((module: any) => {
    //         const GymForm = module.default;

    //         // Create a root and render the React component
    //         const root = createRoot(element!);

    //         // Use ReactDOM.createRoot to render the GymForm component
    //         root.render(GymForm); 
    //         // Use React.createElement instead
    //       })
    //       .catch((err: any) => console.error('Error loading GymForm:', err));
    //   })
    //   .catch(err => console.error("Error loading remote entry:", err));
  }
}
