import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

const routes: Routes = [
  // Vanliga routes här...
  { path: 'dashboard', component: DashboardComponent }, // Start sidan
  
  // Wildcard route för 404 - måste vara SIST i listan
  { path: '**', component: PageNotFoundComponent } // Wildcard, 404-sidan
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


//Man kan använda wildcard-routes (**) för att hantera felaktiga URL:er och 
// visa en "Page Not Found" (404)-sida. 
// Det  wildcard route (**) för att hantera sidor som inte matchar någon av mina definierade rutter. 
// Den placeras sist. 