import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EnvioComponent } from './pages/envio/envio.component';
import { RastreoComponent } from './pages/rastreo/rastreo.component';
import { SolucionesComponent } from './pages/soluciones/soluciones.component';
import { HomeComponent } from './pages/home/home.component';
import { SesionComponent } from './pages/sesion/sesion.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PassComponent } from './pages/pass/pass.component';
import { MercanciasComponent } from './pages/mercancias/mercancias.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'envio', component: EnvioComponent },
    { path: 'rastreo', component: RastreoComponent },
    { path: 'soluciones', component: SolucionesComponent },
    { path: 'sesion', component: SesionComponent},
    { path: 'registro', component: RegistroComponent},
    { path: 'pass', component: PassComponent},
    { path: 'mercancias', component: MercanciasComponent},
    { path: 'empleado', component: EmpleadoComponent},
    { path: 'perfil', component: PerfilComponent},
    {
      path: '**',
      loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent)
    },
    {
      path: 'home',
      component: HomeComponent
    },
    { path: 'perfil', loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent) }
];
