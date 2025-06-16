//Importerar nödvändiga Angular-moduler och komponenter
import { Component } from '@angular/core'; //Component är grunden för alla Angular-komponenter
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component'; //DashboardComponent är den huvudsakliga komponent som ska visas


@Component({
  selector: 'app-root',
  //selector: 'app-root' - Anger hur komponenten kan användas i HTML (t.ex. <app-root></app-root>)
  imports: [DashboardComponent],
  // Importerar DashboardComponent som ska användas i denna komponent
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  //templateUrl och styleUrl - Anger vägarna till HTML-mallen och CSS-filen
})
export class AppComponent {
  title = 'TaskManager';
}

//Exporterar komponentklassen
//Innehåller en enda egenskap title med värdet 'TaskManager' 