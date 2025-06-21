// src/main.server.ts
import { provideServerRendering } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http'; // <-- Importa esto
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Tus rutas

const config = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch()), // <-- ¡Esto es CRUCIAL para SSR!
    provideRouter(routes) // Tus proveedores de rutas
  ]
};

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
