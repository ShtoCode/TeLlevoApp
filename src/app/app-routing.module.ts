import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'inicio-sesion',
    pathMatch: 'full'
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  
  {
    path: 'cambiar-password',
    loadChildren: () => import('./pages/cambiar-password/cambiar-password.module').then( m => m.CambiarPasswordPageModule)
  },
  {
    path: 'inicio-pasajero',
    loadChildren: () => import('./pages/inicio-pasajero/inicio-pasajero.module').then( m => m.InicioPasajeroPageModule)
  },
  {
    path: 'auto-disponible',
    loadChildren: () => import('./pages/auto-disponible/auto-disponible.module').then( m => m.AutoDisponiblePageModule)
  },
  {
    path: 'viaje-solicitado-d',
    loadChildren: () => import('./pages/viaje-solicitado-d/viaje-solicitado-d.module').then( m => m.ViajeSolicitadoDPageModule)
  },

  {
    path: 'inicio-chofer',
    loadChildren: () => import('./pages/inicio-chofer/inicio-chofer.module').then( m => m.InicioChoferPageModule)
  },
  {
    path: 'chofer',
    loadChildren: () => import('./pages/chofer/chofer.module').then( m => m.ChoferPageModule)
  },
  {
    path: 'vehiculo-chofer',
    loadChildren: () => import('./pages/vehiculo-chofer/vehiculo-chofer.module').then( m => m.VehiculoChoferPageModule)
  },
  {
    path: 'notificacion',
    loadChildren: () => import('./pages/notificacion/notificacion.module').then( m => m.NotificacionPageModule)
  },
  {
    path: 'notificacion-pgr-chofer',
    loadChildren: () => import('./pages/notificacion-pgr-chofer/notificacion-pgr-chofer.module').then( m => m.NotificacionPgrChoferPageModule)
  },
  {
    path: 'detalle/:id',
    loadChildren: () => import('./pages/detalle/detalle.module').then( m => m.DetallePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
