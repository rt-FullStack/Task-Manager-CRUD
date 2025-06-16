import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

//Importerar nödvändiga Angular-moduler och tjänster
//TaskService används för att kommunicera med backend
//Form-relaterade moduler för att hantera formulär
//CommonModule för grundläggande Angular-direktiv

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
//Definierar komponenten med selector app-dashboard
//standalone: true indikerar att detta är en fristående komponent
//Importerar nödvändiga moduler direkt i komponenten


export class DashboardComponent implements OnInit {
  taskService = inject(TaskService);
//Använder inject för att hämta TaskService-instansen
//Implementerar OnInit för initieringslogik

  users: any[] = []; // Lista över användare
  categories: any[] = []; // Lista över kategorier
  selectedUserId!: number; // Vald användar-ID
  selectedCategoryId!: number; // Vald kategori-ID

  inprogressTask: any[] = []; // Pågående uppgifter
  completedTasks: any[] = []; // Avslutade uppgifter

  selectedTask: any;  // För närvarande vald uppgift

  updateTaskForm: FormGroup; // Formulär för uppdatering
  newTaskForm: FormGroup; // Formulär för ny uppgift

  constructor(private builder: FormBuilder) {
    
    // Skapar formulär för uppdatering av uppgift
    this.updateTaskForm = builder.group({
      id: [''],
      title: ['', Validators.required],
      description: [''],
      completed: [''],
      dueDate: [''],
      userId: [''],
      categoryId: ['']
    });

    // Skapar formulär för ny uppgift
    this.newTaskForm = builder.group({
      id: [''],
      title: ['', Validators.required],
      description: [''],
      completed: ['true'],
      dueDate: [''],
      userId: [''],
      categoryId: ['']
    });
  }
//Initierar två formulär med FormBuilder:
//updateTaskForm för att redigera befintliga uppgifter
//newTaskForm för att skapa nya uppgifter
//Validators.required säkerställer att titel är obligatorisk


  ngOnInit(): void { 
    //ngOnInit() är en livscykelmetod som definieras i Angulars OnInit-interface. 
    //Den används för att köra logik när komponenten har skapats och dess input-data är tillgänglig.
    this.getAllUsers(); // Hämtar användare vid start 
    this.getAllCategories(); // Hämtar kategorier vid start
  }
//Hämtar användare och kategorier när komponenten initieras

//Metod
//Hämta data

// (* Metoden getAllUsers() hämtar användardata från en tjänst (taskService) och sparar resultatet i en komponentvariabel users.)

getAllUsers() { //Detta är en metoddeklaration i komponentklassen. Man anropa den i ngOnInit()
    this.taskService.getAllUsers() //Här anropas en metod i en service som troligtvis gör ett HTTP-anrop till ett API.
      .subscribe((res: any) => {
        //Eftersom getAllUsers() returnerar en Observable, 
        // måste man prenumerera på den med .subscribe() för att få tillgång till datan när den kommer.
        this.users = res; // Sparar användare i komponenten
      });
  }

  getAllCategories() {
    this.taskService.getAllCategories()
      .subscribe((res: any) => {
        this.categories = res; // Sparar katagori i komponenten
      });
  }
//Hämtar användare och kategorier från TaskService

//Hämta uppgifter
  getAllTracks() {
    if (this.selectedCategoryId !== undefined && this.selectedUserId !== undefined) {
      //DashboardComponent anropar TaskService
      this.taskService.getAllTasksForUser(this.selectedUserId, this.selectedCategoryId)
        .subscribe((res: any) => {
          this.filterResults(res);
        });
    } else {
      alert('Vänligen välj användare och kategori');
    }
  }
  //Hämtar uppgifter för vald användare och kategori
  //Kräver att både användare och kategori är valda


  //Filtrera resultat
  filterResults(res: any) {
    this.completedTasks = [];
    this.inprogressTask = [];

    res.forEach((task: any) => {
      if (task.completed) {
        this.completedTasks.push(task);
      } else {
        this.inprogressTask.push(task);
      }
    });
  }
  //Delar upp uppgifter i två listor baserat på om de är avslutade eller ej


//Hantera uppgifter
  selectTask(task: any) {
    this.selectedTask = task;
    this.updateTaskForm.patchValue({
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      dueDate: new Date(task.dueDate).toISOString().substring(0, 10),
      userId: task.userId,
      categoryId: task.categoryId
    });
  }
//Väljer en uppgift och fyller i uppdateringsformuläret


  updateTask() {
    if (this.updateTaskForm.valid) {
      this.taskService.updateTask(this.updateTaskForm.value).subscribe({
        next: (res) => {
          console.log('Task updated successfully', res);
          this.getAllTracks(); // Refresh the task lists
        },
        error: (err) => {
          console.error('Error updating task', err);
        }
      });
    }
  }
  //Uppdaterar en befintlig uppgift och uppdaterar listan

  deleteTask(task: any) {
  if(confirm("Vill du ta bort uppgiften: " + task.title)) {
    this.taskService.deleteTask(task.id).subscribe({
      next: (res) => {
        // Tar bort uppgiften från båda arrayerna
        this.inprogressTask = this.inprogressTask.filter(t => t.id !== task.id);
        this.completedTasks = this.completedTasks.filter(t => t.id !== task.id);
        
        // Uppdaterar från servern för att säkerställa konsistens
        this.getAllTracks();
      },
      error: (err) => {
        console.error('Error deleting task', err);
      }
    });
  }
}
//Raderar en uppgift efter bekräftelse och uppdaterar listan



addNewTask(){
this.taskService.createNewTask(this.newTaskForm.value).then((data : any) => {
  this.selectedCategoryId = data.categoryId;
  this.selectedUserId = data.userId;
  this.getAllTracks();

    })

  }
  //Skapar en ny uppgift och uppdaterar listan

}