import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }
  //@Injectable gör klassen till en injicerbar tjänst som är tillgänglig i hela applikationen (providedIn: 'root')
  //Använder Angulars HttpClient för HTTP-anrop
  //apiUrl definierar bas-URL:en för API:et (localhost:3000 i detta fall)


  //Metoder
  //Hämta data
  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl + 'users');
  }
  getAllCategories(): Observable<any> {
    return this.http.get(this.apiUrl + 'categories');
  }
 // Returnerar Observable för att hämta alla användare respektive kategorier
  //Använder GET-metoden mot /users och /categories endpoints


  //TaskService skickar HTTP-anrop 
  getAllTasksForUser(userId: number, categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}todos?userId=${userId}&categoryId=${categoryId}`);
  }
  //Hämtar uppgifter för en specifik användare och kategori
  //Använder query-parametrar (userId och categoryId) för att filtrera

  
  getAllTasks() : Promise<any> {
     return firstValueFrom (this.http.get<any>(this.apiUrl+'todos'));
  }
  //Hämtar alla uppgifter och returnerar ett Promise istället för Observable
  //firstValueFrom konverterar Observable till Promise

async createNewTask(task : any){
const tasks = await this.getAllTasks(); 
task.id = (task.length === 0) ? 1 : Math.max(...tasks.map((task : any) => task.id)) + 1;
return await firstValueFrom(this.http.post(this.apiUrl+'todos', task));
}

  //Ändra data
  updateTask(task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}todos/${task.id}`, task);
  }
  //Uppdaterar en befintlig uppgift med PUT-metoden
  //Skickar med hela uppgiftsobjektet i request body

 
  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}todos/${taskId}`);
  }
  //Raderar en uppgift med DELETE-metoden
  //Tar taskId som parameter för att identifiera vilken uppgift som ska raderas


//Skapar en ny uppgift med POST-metoden
//Genererar ett nytt ID baserat på befintliga uppgifter:
//Om inga uppgifter finns, sätts ID till 1
//Annars hittas högsta ID:t och ökas med 1
//Returnerar ett Promise med den skapade uppgiften

}