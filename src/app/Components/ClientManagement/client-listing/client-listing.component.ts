import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { ClientService } from 'src/app/Services/client.service';

@Component({
  selector: 'app-client-listing',
  templateUrl: './client-listing.component.html',
  styleUrls: ['./client-listing.component.css']
})
export class ClientListingComponent {
  clients: any[] = [];
  filteredClientsSubject$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  searchText: string = '';
  sortOption: string = 'name';
  isModalOpen: boolean = false;
  clientForm: FormGroup;
  clientService = inject(ClientService);
  isEdit:boolean=false;
  filteredClients: any[] = [];
  subscription: Subscription | undefined;
  authService = inject(AuthService);
  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      joiningDate: ['', Validators.required],
      plan: ['', Validators.required],
      password: ['', Validators.required],
      
    });
  }
  ngOnInit(): void {
    // Initialize clients array with some data or fetch from an API
    
   this.filteredClientsSubject$.subscribe(clients => {
    this.filteredClients = clients;
    this.clientService.check().subscribe();
  });
  this.loadClients();
  }
loadClients():void{
  this.clientService.getClients().subscribe({
    next:(res)=>{
      this.filteredClientsSubject$.next(res);
    },
    error:(err)=>{
      console.log(err);
      
    }
  });
}
  searchClients(): void {
    this.filteredClients = this.clients.filter(client =>
      client.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      client.plan.toLowerCase().includes(this.searchText.toLowerCase()) ||
      client.phone.includes(this.searchText)
    );
  }

  sortClients(): void {
    this.filteredClients.sort((a, b) => {
      if (this.sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (this.sortOption === 'joiningDate') {
        return a.joiningDate.getTime() - b.joiningDate.getTime();
      }
      return 0;
    });
  }

  editClient(client: any): void {
    // Implement edit logic here
    this.isEdit=true;
    console.log('Edit client:', client);
    this.openModal();
    this.populateFormWithItemValues(client); 
     
  }
  populateFormWithItemValues(client: any) {
    this.clientForm.patchValue({
      id:client.id,
      name: client.name,
      email:client.email,
      phone:client.phone,
      password:client.password,
      plan:client.plan,
      joiningDate:new Date(client.joiningDate).toISOString().substring(0, 10)
    });
  }

  deleteClient(clientId: any) {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(clientId).subscribe(() => {
        this.loadClients();
      });
    }
  }


  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(item:any): void {
    if(item.id==null){
     this.addClient();
     this.loadClients();
     this.closeModal();
    }else{
       this.clientService.updateClient(item.id, item).subscribe({
        next:()=>{
          alert("Updated Successfully");
           
        },
        error:(err)=>{
          alert(err);
        }
       })
    }
  }
   
  
 async addClient():Promise<void>{
    (await this.clientService.addClient(this.clientForm.value)).subscribe(
      {
        next:()=>{
          const email = this.clientForm.get('email')?.value;
          const password = "password";
          this.authService.signUp(email, password,'gymuser');
          alert("Added Successfully");
           
        },
        error:(err)=>{
          alert(err);
        }
      }
    );
    this.closeModal();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
