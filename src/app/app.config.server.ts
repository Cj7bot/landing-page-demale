import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { routes } from './app.routes';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { serverRoutes } from './app.routes.server';
import { provideRouter } from '@angular/router';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    provideRouter(routes),
    provideNoopAnimations()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
