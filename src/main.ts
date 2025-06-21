// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http'; // <-- Importa esto
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router'; // Si usas rutas
import { routes } from './app/app.routes'; // Tus rutas

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()), // <-- ¡Aquí está la clave!
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
