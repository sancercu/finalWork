import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { PodcastsListComponent } from './features/podcasts/pages/podcasts-list/podcasts-list.component';
import { featuresRoutes } from './features/features.module';

const routes: Routes = [
  // Inyectamos las rutas de todas las features
  ...featuresRoutes,
  // Definicion de ruta por defecto
  { path: '', component: PodcastsListComponent },
   // Página 404 que no utiliza el layout principal
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ], // Se importan las rutas que definimos
  exports: [ RouterModule ] // Se exportan las rutas que definimos al resto de la app
})
export class AppRoutingModule { }
