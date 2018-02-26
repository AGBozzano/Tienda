import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { LoginComponent } from './Component/login/login.component';
import { CatalogoComponent } from './Component/catalogo/catalogo.component';
import { ProductoComponent } from './Component/catalogo/producto/producto.component';
import { CarritoComprasComponent } from './Component/carrito-compras/carrito-compras.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'catalogo', component: CatalogoComponent},
  { path: 'catalogo/producto/:id', component: ProductoComponent},
  { path: 'carrito', component: CarritoComprasComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'catalogo' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
