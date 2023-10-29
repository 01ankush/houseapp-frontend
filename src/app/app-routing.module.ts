import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'add-property',
    loadChildren: () => import('./pages/add-property/add-property.module').then( m => m.AddPropertyPageModule)
  },
  // {
  //   path: 'room-details',
  //   loadChildren: () => import('./room-details/room-details.module').then( m => m.RoomDetailsPageModule)
  // },
  {
    path: 'room-details/:id',
    loadChildren: () => import('./room-details/room-details.module').then(m => m.RoomDetailsPageModule)
  },
  {
    path: 'map-view',
    loadChildren: () => import('./pages/map-view/map-view.module').then( m => m.MapViewPageModule)
  },
  {
    path: 'street-view/:id',
    loadChildren: () => import('./pages/street-view/street-view.module').then( m => m.StreetViewPageModule)
  },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
