# Task Manager CRUD Applikation
En fullständig CRUD-applikation (Create, Read, Update, Delete) byggd med Angular för hantering av uppgifter, användare och kategorier. Applikationen använder en JSON-server som backend.

# Funktioner
- Användarhantering: Visa och filtrera uppgifter per användare
- Kategorihantering: Organisera uppgifter i olika kategorier
- Uppgiftshantering:
Skapa nya uppgifter
Visa uppgiftsdetaljer
Redigera befintliga uppgifter
Ta bort uppgifter
Filtrera uppgifter efter status (Pågående/Avslutade)
- Responsiv design: Anpassad för olika skärmstorlekar
- Modaler: Användarvänliga popup-fönster för alla CRUD-operationer

# Teknologier
- Frontend:
Angular 16+
TypeScript
Bootstrap 5
Reactive Forms
- Backend:
JSON-server (simulerar REST API)

# Övrigt:
- RxJS för hantering av observables
- Font Awesome ikoner

# Förutsättningar
- Node.js (v16 eller senare)
- npm (medföljer Node.js)
- Angular CLI (npm install -g @angular/cli)

# Installation
- npm install
# Installera JSON-server (globalt om du inte redan har det):
- npm install -g json-server
- Köra applikationen
# Behöver starta två servrar parallellt:
Starta JSON-server (backend):
- json-server --watch db.json
- Servern startas på http://localhost:3000

# Starta Angular-applikation (frontend):
- ng serve
- Applikationen öppnas automatiskt på http://localhost:4200

# API Endpoints
JSON-servern tillhandahåller följande endpoints:
- GET /users - Hämta alla användare
- GET /categories - Hämta alla kategorier
- GET /todos - Hämta alla uppgifter
- GET /todos?userId=X&categoryId=Y - Filtrera uppgifter
- POST /todos - Skapa ny uppgift
- PUT /todos/:id - Uppdatera uppgift
- DELETE /todos/:id - Ta bort uppgift

# Testdata
Applikationen kommer med förifylld testdata i db.json:
- 6 användare
- 6 kategorier
- Flera exempeluppgifter
